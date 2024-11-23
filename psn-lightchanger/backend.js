const axios = require('axios')
const express = require('express')
const cors = require('cors')
const psnapi = require('psn-api')
const { env } = require('process')
const app = express()


app.use(cors())

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

    async function playerInfo() {
        
        const myNpsso = npssoCookie

        try{

            const accessCode = await psnapi.exchangeNpssoForCode(`${myNpsso}`)

            const authorization = await psnapi.exchangeCodeForAccessToken(accessCode)

            const response = await psnapi.getBasicPresence(authorization, "me") 

            var json_res = JSON.parse(JSON.stringify(response))

            res.send(json_res)
        }
        catch{

            res.status(500).send({})
        }
    }
    
    playerInfo()
})


app.get("/create_thread/:token/:label", (req, res) => {

    //console.log(`${process.env.PSN_TOKEN}`)

    var key = 'c798e0d43f3f5caa33d52c3f92909f9948a661eacf4edc2357a293a728f4df7d'

    const authToken = 'Bearer '.concat(req.params.token)

    var label = req.params.label

    axios.get(`https://api.lifx.com/v1/lights/${label}`, {
        headers: {
          "Authorization" : authToken
        }
    }).then((resp) => {

        console.log(resp)
    })

    res.send(label)

})


app.listen(3100, () => {
    console.log("Server is Running")
})