const { spawn } = require("child_process")
const cors = require("cors")
const psnapi = require("psn-api")
const axios = require("axios")
const express = require("express"),
  bodyParser = require("body-parser")
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
  throw new Error("BROKEN")
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

      res.status(200)
        .send({"title" : response.basicPresence.gameTitleInfoList[0].titleName})
    } catch (err) {
        
        if("basicPresence" in response)
          res.status(200)
              .send({"title" : ""})
        else {
          res.status(500).send(err)
        }
    }
  }

  currentGame()
})

/**
 * @api /create_process PUTS lifx ids through the create_process python script
 *      to create separate process for the list of lights passed in respectivelys
 * @sends the title of the game being played
 */
app.put("/create_process/:lifx_ids", (req, res) => {
  //console.log("In create Thread")
  const authToken = "Bearer ".concat(req.body.data.lifx_token)
  const psn_token = req.body.data.psn_token

  const pyProg = spawn(
    "python",
    ["create_process.py"].concat(
      req.body.data.lifx_token,
      psn_token,
      req.params.lifx_ids,
    ),
  )

  // Collect data from script and print to console
  var data = ""
  pyProg.stdout.on("data", (stdout) => {
    data += stdout.toString()
  })

  // Print errors to console, if any
  pyProg.stderr.on("data", (stderr) => {
    console.log(`stderr: ${stderr}`)
  })

  // When script is finished, print collected data
  pyProg.on("close", (code) => {
    console.log(`child process exited with code ${code}`)
    console.log(data)
  })

  return res.status(200)
})

/**
 * @api /light_color is used to GET the current Light color information of the LIFX
 *      light
 * @sends a json containing the color data
 */
app.get("/light_color/:token/:id", (req, res) => {
  const authToken = req.params.token
  const id = req.params.id

  axios
    .get(`https://api.lifx.com/v1/lights/${id}`, {
      headers: {
        Authorization: authToken,
      }
    })
    .then((response) => {
      res.status(200).send({ color: response.data[0].color })
    })
})

/**
 * @api /update_light will update the color of the lifx light based on
 *      requests
 * @sends a response code
 */
app.put("/update_light/:token/:lifx_id/:color_req/", (req, res) => {
  const authToken = "Bearer ".concat(req.params.token)
  var id = req.params.lifx_id
  const state = req.data

  color_req = JSON.parse(req.params.color_req)

  id = JSON.parse(id)

  const options = {
    method: "PUT",
    url: `https://api.lifx.com/v1/lights/${id}/state`,
    headers: {
      accept: "text/plain",
      "content-type": "application/json",
      Authorization: authToken,
    },
    data: {
      color: `hue:${color_req.hue} saturation:${color_req.saturation} kelvin:${color_req.kelvin}`,
      duration: "1",
    }
  }
  axios
    .request(options)
    .then((res) => {})
    .catch((err) => console.error(err))

  res.status(200).send("ok")
})

app.listen(3100, () => {
  console.log("Server is Running")
})
