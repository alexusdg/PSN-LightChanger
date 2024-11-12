const express = require('express')
const cors = require('cors')
const psnapi = require('psn-api')
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


app.listen(3100, () => {
    console.log("Server is Running")
})