const express = require('express')
const app = express()
const cors = require('cors')


const psnapi = require('psn-api')

app.use(cors())

app.get("/psinfo/:npsso", (req, res, next) => {

    const npssoCookie = req.params.npsso

    async function playerInfo() {
        
        const myNpsso = npssoCookie

        const accessCode = await psnapi.exchangeNpssoForCode(`${myNpsso}`);

        const authorization = await psnapi.exchangeCodeForAccessToken(accessCode);

        const response = await psnapi.getBasicPresence(authorization, "me"); 

        var json_res = JSON.parse(JSON.stringify(response))

        res.send(json_res)
    }
    

    playerInfo()
})


app.listen(3100, () => {
    console.log("Server is Running")
})