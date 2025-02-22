const app = require("./route")

const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PORT = process.env.NODE_ENV.REACT_APP_BACKEND_PORT

app.listen(PORT, () => {
  console.log("Server is Running", PORT)
})
