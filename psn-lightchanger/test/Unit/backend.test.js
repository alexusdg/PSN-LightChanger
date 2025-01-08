const app = require('../../route')
const request = require('supertest')
const { cleanup } = require("@testing-library/react")
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
    
            
            expect(res1.statusCode).toBe(200)

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
                .query({ lifx_token: LIFX_CODE})
        })
    })
})
