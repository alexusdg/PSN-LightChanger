const { spawn } = require('child_process')
const cors = require('cors')
const psnapi = require('psn-api')
const axios = require('axios')
const express = require('express'), bodyParser = require('body-parser');
const app = express()


app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    throw new Error('BROKEN');
});

/**
 * @api /psinfo is used to gather psn user information
 * 
 * @returns a json contain psn user info upon success otherwise
 *          it will return nothing
 */
app.get("/psinfo/:npsso", (req, res, next) => {

    const npssoCookie = req.params.npsso

    //console.log(npssoCookie)

    async function playerInfo() {
        
        const myNpsso = npssoCookie

        try{

            const accessCode = await psnapi.exchangeNpssoForCode(`${myNpsso}`)

            const authorization = await psnapi.exchangeCodeForAccessToken(accessCode)

            //const response = await psnapi.getBasicPresence(authorization, "me") 

            console.log(authorization.refreshToken)

            res.send({"access_code" : authorization.refreshToken})
        }
        catch(err){

            res.status(500).send({ err })
        }
    }
    
    playerInfo()
})

app.get("/ps_game_playing/:access_code", (req, res) => {

    const code = req.params.access_code //this is refreshtokedn

    async function currentGame(){

        try{
            //console.log(code, "HERE")

            const authorization = await psnapi.exchangeRefreshTokenForAuthTokens(code)

            //console.log(authorization)

            const response = await psnapi.getBasicPresence(authorization, "me")

            //console.log(response)

            res.send(response.basicPresence.gameTitleInfoList[0].titleName)

        }catch(err){


            res.status(500).send(err)

        }

    }

    currentGame()
})


app.put("/create_thread/:label", (req, res) => {

    console.log(req.params.label)
    console.log("In create Thread")
    const authToken = 'Bearer '.concat(req.body.data.lifx_token)
    const psn_token = req.body.data.psn_token

    //var label = JSON.parse(req.params.label)

    const pyProg = spawn('python', ['createThread.py'].concat(req.body.data.lifx_token, psn_token, req.params.label));

    // Collect data from script and print to console
    var data = ''
    pyProg.stdout.on('data', (stdout) => {
        data += stdout.toString()
    });

    // Print errors to console, if any
    pyProg.stderr.on('data', (stderr) => {
        console.log(`stderr: ${stderr}`)
    });

    // When script is finished, print collected data
    pyProg.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
        console.log(data)
    });

    return res.status(200)

})

app.get("/light_color/:token/:id", (req, res) => {

    const authToken = req.params.token
    const id = req.params.id

    axios.get(`https://api.lifx.com/v1/lights/${id}`, {
        headers: {
            "Authorization" : authToken
        }
    }).then((response) => {

        console.log(response.data[0].color)

        res.status(200).send({"color" : response.data[0].color})
    })
})

app.put("/update_light/:token/:id/:color_req/", (req, res) => {

    const authToken = 'Bearer '.concat(req.params.token)
    var id = req.params.id
    const state = req.data

    color_req = JSON.parse(req.params.color_req)

    id = JSON.parse(id)

    // "color" : `hue:${color_req.hue} saturation:${color_req.saturation} kelvin:${color_req.kelvin}`

    const options = {
        method: 'PUT',
        url: `https://api.lifx.com/v1/lights/${id}/state`,
        headers: {
          accept: 'text/plain',
          'content-type': 'application/json',
          Authorization: authToken
        },
        data: {"color" : `hue:${color_req.hue} saturation:${color_req.saturation} kelvin:${color_req.kelvin}`,
                "duration" : "0.5"    
            }
      };
      
      axios
        .request(options)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
})

app.listen(3100, () => {
    console.log("Server is Running")
})