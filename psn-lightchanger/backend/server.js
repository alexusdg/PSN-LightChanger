const app = require("./route")

const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: path.join(__dirname, "..", ".env") })

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT
const port = process.env.PORT || BACKEND_PORT

app.listen(port, () => {
  console.log("Server is Running", port)
})
