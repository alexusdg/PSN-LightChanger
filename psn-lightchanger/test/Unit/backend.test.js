const { default: axios } = require("axios")
const app = require('../../backend')
const request = require('supertest')
const { cleanup } = require("@testing-library/react")
require('dotenv').config()

const useSpy = jest.fn()
const listenSpy = jest.fn()

jest.mock('axios')

const playerInfo = jest.fn()

afterAll(cleanup)

describe('PSN APIs', () => {
    var res
    var res1
    var res1_2

    describe('GET /psn_auth', () => {

            test('200 OK response', async () => {

                res1 = await request(app)
                    .get("/ps_auth/")
                    .query({ npsso: process.env.REACT_APP_PSN_TOKEN})
    
                expect(res1.statusCode).toBe(200)
            })
      })


      test('GET /psn_game_playing', async () => {

        res1_2 = await request(app)
            .get("/ps_game_playing/")
            .query({ refresh_token: res1.body.refresh_token})

            expect(res1.statusCode).toBe(200)
      })
  })

describe('The router', () => {
    test('The get route', async () => {
      const res = await request(app).get('/lifx_auth/', {
        params: {
            lifx_token: ""
        }
      })
      .then(expect(500))
    })

    test('The get route', async () => {
        var code = ""
        
        request(app).get('/lifx_auth/', {
          params: {
              lifx_token: process.env.REACT_APP_LIFX
          }
        })
        .then(expect(200))
    
      })
  })
