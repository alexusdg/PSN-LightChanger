jest.setTimeout(10000);

const app = require('../../route')
const request = require('supertest')
const { cleanup } = require("@testing-library/react")
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
    
            expect(res1_2.statusCode).toBe(200)

          })
     })

     //@todo check fo valid id
     describe('PUT /create_process', () => {
        const url = "/create_process/"
        const fake_id = "[fake_id]"

        test('200 OK response', async () => {
            const spy = jest.spyOn(procFunc, 'createProcess').mockImplementation(jest.fn())

            await request(app)
                .put(url)
                .send({
                    lifx_token : LIFX_CODE,
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

            await request(app)
                .get(url)
                .query({ lifx_token : LIFX_CODE})
                .expect(200)
        })
    })

    describe('PUT /update_light', () => {
        const url = "/update_light/"

        test('200 OK response', async () => {

            await request(app)
                .put(url)
                .type('json')
                .query({
                    lifx_token : LIFX_CODE,
                    light_id : 'd073d56553a2'
                })
                .send({
                    color_data : {hue :181.88, saturation : 0.8842, kelvin : 2500}
                })
                .expect(200)
        
        })

    })

    
})

