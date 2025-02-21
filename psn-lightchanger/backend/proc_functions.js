/* istanbul ignore next */
const { spawn } = require("child_process")

const procFunc = {
  createProcess(lifx_token, psn_token, lifx_ids) {
    const pyProg = spawn(
      "python",
      ["create_process.py"].concat(lifx_token, psn_token, lifx_ids),
    )

    var data = ""
    pyProg.stdout.on("data", (stdout) => {
      data += stdout.toString()
    })

    pyProg.stderr.on("data", (stderr) => {
      console.log(`stderr: ${stderr}`)
    })

    pyProg.on("close", (code) => {
      console.log(`child process exited with code ${code}`)
      console.log(data)
    })

    return 0
  },
}

module.exports = { procFunc }
