const cors = require("cors")
const psnapi = require("psn-api")
const axios = require("axios").default
const express = require("express"),
  bodyParser = require("body-parser")
const app = express()
const { routeFunc } = require("./route_functions")
const { procFunc } = require("./proc_functions")

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.status(200).send("OK")
})

/**
 * @api /psinfo will verify if user is a valid psn user
 * @param {string} npsso psn cookie provided by psn
 * @sends status 200 along with a json containing the refresh token
 *        status 500 when user can't be authenticated
 */
app.get("/ps_auth/", (req, res) => {
  const npssoCookie = req.query.npsso

  async function playerInfo() {
    const myNpsso = npssoCookie

    try {
      const accessCode = await psnapi.exchangeNpssoForCode(`${myNpsso}`)

      const authorization = await psnapi.exchangeCodeForAccessToken(accessCode)

      res.status(200).send({ refresh_token: authorization.refreshToken })
    } catch (err) {
      res.status(500).send({ err })
    }
  }

  playerInfo()
})

/**
 * @api /ps_game_playing will GET the title of the game currently
 *      being played
 * @param {string} refresh_token token provied by psn from /ps_auth
 * @sends status 200 along with the title of the game being played
 *        status 500
 */
app.get("/ps_game_playing/", (req, res) => {
  const code = req.query.refresh_token //this is the refresh token

  async function currentGame() {
    var response
    try {
      const authorization = await psnapi.exchangeRefreshTokenForAuthTokens(code)

      response = await psnapi.getBasicPresence(authorization, "me")

      res
        .status(200)
        .send({ title: response.basicPresence.gameTitleInfoList[0].titleName })
    } catch (err) {
      if (response !== undefined && "basicPresence" in response)
        res.status(200).send({ title: "" })
      else {
        res.status(500).send(err)
      }
    }
  }

  currentGame()
})

/**
 * @api /create_process PUTS lifx ids through the create_process python script
 *      to create separate process for the list of lights passed in respectively
 * @param {string} lifx_token lifx_token
 * @param {string} psn_token psn refresh token
 * @param {array} lifx_ids list of the ids of lights to change the color of
 * @sends status 200 - ok
 */
app.put("/create_process/", (req, res) => {
  //console.log("In create Thread")
  const lifx_token = req.query.lifx_token
  const psn_token = req.query.psn_token
  const lifx_ids = req.query.lifx_ids

  procFunc.createProcess(lifx_token, psn_token, lifx_ids)

  res.status(200).send("ok")
})

/**
 * @api /lifx_auth is used to verify token and send light data
 *        back to user
 * @param {string} lifx_token lifx access token
 * @sends a json containing lifx light data
 */
app.get("/lifx_auth/", (req, res) => {
  const authToken = "Bearer ".concat(req.query.lifx_token)

  axios
    .get("https://api.lifx.com/v1/lights/all", {
      headers: {
        Authorization: authToken,
      },
    })
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((err) => {
      res.status(500).send({ error: err })
    })
})

/**
 * @todo - update this when it gets used
 * @api /light_color is used to GET the current Light color information of the LIFX
 *      light
 * @param {string} lifx_token lifx access token
 * @param {string} light_id lifx light id
 * @sends a json containing the color data
 */
/**
app.get("/light_color/", (req, res) => {
  const authToken =  "Bearer ".concat(req.query.lifx_token)
  const id = req.query.light_id

  axios
    .get(`https://api.lifx.com/v1/lights/${id}`, {
      headers: {
        Authorization: authToken,
      }
    })
    .then((response) => {
      res.status(200).send({ color: response.data[0].color })
    })
    .catch((err) => {
      res.status(500).send({ error : err})
    })
})*/

/**
 * @api /update_light will update the color of the lifx light based on
 *      requests
 * @param {string} light_id - lifx light ids
 * @param {json} color_data - json containing the color data
 * @sends a response code
 */
app.put("/update_light/", (req, res) => {
  const authToken = "Bearer ".concat(req.query.lifx_token)
  var id = req.query.light_id
  var color_data = req.body.color_data

  //writing this to work with jest & postman testing along with python calls
  try {
    color_data = JSON.parse(color_data)
  } catch {
    color_data = req.body.color_data
  }

  routeFunc.updateLight(res, authToken, id, color_data)

  //res.status(stat).send({info : info})
})

module.exports = app
