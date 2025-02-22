const app = require("./backend/route")

require("dotenv").config()

const PORT = process.env.NODE_ENV.REACT_APP_BACKEND_PORT

app.listen(PORT, () => {
  console.log("Server is Running")
})
