//jest.setTimeout(7000)

const app = require('../../route')
const request = require('supertest')
const { cleanup } = require("@testing-library/react")
const child_process = require('child_process');
const { procFunc } = require('../../route_functions')

require('dotenv').config()

const PSN_TOKEN = process.env.REACT_APP_PSN_TOKEN
const LIFX_CODE = process.env.REACT_APP_LIFX


afterAll(cleanup)

describe('PSN APIs', () => {
    var res1
    var res1_2

    describe('GET /psn_auth', () => {
        const url = "/ps_auth/"

        test('500 err response', async () => {

            await request(app)
                .get(url)
                .query({ npsso: ""})
                .expect(500)
        })

        test('200 OK response', async () => {

            res1 = await request(app)
                .get(url)
                .query({ npsso: PSN_TOKEN})

            expect(res1.statusCode).toBe(200)
        })
    })

    
    describe('GET /ps_game_playing/', () => {
        const url = "/ps_game_playing/"

        test('500 err response', async () => {

            await request(app)
                .get(url)
                .query({ refresh_token: ""})
                .expect(500)
        })

        test('200 OK response', async () => {

            res1_2 = await request(app)
                .get(url)
                .query({ refresh_token: res1.body.refresh_token})
            
            console.log(res1_2.body)
            
            expect(res1_2.statusCode).toBe(200)

          })
     })

     //@todo check fo valid id
     describe('PUT /create_process', () => {
        const url = "/create_process/"
        const fake_id = "[fake_id]"

        test('200 OK response', async () => {
            const spy = jest.spyOn(procFunc, 'createProcess').mockImplementation(jest.fn())

            const res =  await request(app)
                .put(url)
                .send({
                    lifx_token : res1.body.refresh_token,
                    psn_token : PSN_TOKEN,
                    lifx_ids : fake_id
                }).expect(200)

            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
        })
     })
  })

describe('LIFX APIs', () => {
   
    describe('GET /lifx_auth', () => {
        const url = "/lifx_auth/"

        test('500 err response', async () => {

            await request(app)
                .get(url)
                .query({ lifx_token : ""})
                .expect(500)
        })

        test('200 OK response', async () => {

            console.log(LIFX_CODE)

            await process.nextTick(() => {});
           const des =  await request(app)
                .get("/lifx_auth/")
                .query({ lifx_token: `${LIFX_CODE}`})
                .expect(200)

            console.log(des.body.error)
        })
    })
})
