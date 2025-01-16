const { spawn } = require("child_process")
const axios = require('axios').default

const procFunc = {

    createProcess(lifx_token, psn_token, lifx_ids) {

        const pyProg = spawn(
            "python",
            ["create_process.py"].concat(
              lifx_token,
              psn_token,
              lifx_ids
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
    
    
          return 0;
    },

    updateLight(res, authToken, light_id, color_data){
      const options = {
        method: "PUT",
        url: `https://api.lifx.com/v1/lights/${light_id}/state`,
        headers: {
          accept: "text/plain",
          "content-type": "application/json",
          Authorization: authToken,
        },
        data: {
          color: `hue:${color_data.hue} saturation:${color_data.saturation} kelvin:${color_data.kelvin}`,
          duration: "1",
        }
      }
      axios
        .request(options)
        .then(() => {res.status(200).send({status : "ok"})})
        .catch((err) => {res.status(500).send({error : err})})
    }
}


module.exports = {procFunc}