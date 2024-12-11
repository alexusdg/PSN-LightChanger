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
 * @api /psinfo is used to gather psn user information
 *
 * @returns a json contain psn user info upon success otherwise
 *          it will return nothing
 */
app.get("/psinfo/:npsso", (req, res, next) => {
  const npssoCookie = req.params.npsso

  async function playerInfo() {
    const myNpsso = npssoCookie

    try {
      const accessCode = await psnapi.exchangeNpssoForCode(`${myNpsso}`)

      const authorization = await psnapi.exchangeCodeForAccessToken(accessCode)

      res.send({ access_code: authorization.refreshToken })
    } catch (err) {
      res.status(500).send({ err })
    }
  }

  playerInfo()
})

app.get("/ps_game_playing/:access_code", (req, res) => {
  const code = req.params.access_code //this is the refresh token

  async function currentGame() {
    try {
      const authorization = await psnapi.exchangeRefreshTokenForAuthTokens(code)

      const response = await psnapi.getBasicPresence(authorization, "me")

      res.send(response.basicPresence.gameTitleInfoList[0].titleName)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  currentGame()
})

app.put("/create_process/:label", (req, res) => {
  //console.log("In create Thread")
  const authToken = "Bearer ".concat(req.body.data.lifx_token)
  const psn_token = req.body.data.psn_token

  const pyProg = spawn(
    "python",
    ["create_process.py"].concat(
      req.body.data.lifx_token,
      psn_token,
      req.params.label,
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

app.get("/light_color/:token/:id", (req, res) => {
  const authToken = req.params.token
  const id = req.params.id

  axios
    .get(`https://api.lifx.com/v1/lights/${id}`, {
      headers: {
        Authorization: authToken,
      },
    })
    .then((response) => {

      res.status(200).send({ color: response.data[0].color })
    })
})

app.put("/update_light/:token/:id/:color_req/", (req, res) => {
  const authToken = "Bearer ".concat(req.params.token)
  var id = req.params.id
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
