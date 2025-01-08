const app = require('../../route')

require('dotenv').config()

const PORT = process.env.REACT_APP_BACKEND_PORT

app.listen(PORT, () => {
    console.log("Server is Running")
  })