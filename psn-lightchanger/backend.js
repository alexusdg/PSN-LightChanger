const axios = require('axios')
const { spawn } = require('child_process');
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


app.put("/create_thread/:token/:label", (req, res) => {

    const authToken = 'Bearer '.concat(req.params.token)

    //var label = JSON.parse(req.params.label)

    //console.log(label)

    const pyProg = spawn('python', ['createThread.py'].concat(authToken, req.params.label));

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


app.listen(3100, () => {
    console.log("Server is Running")
})