import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

const PORT = process.env.REACT_APP_BACKEND_PORT

/**
 * @function VerifyPsnUser Title component
 * 
 * @returns an html that changes navigation to /lights_verify
 */
export function VerifyPsnUser() {
  const navigate = useNavigate()

  var entered_lifx_code = document.querySelector(".token_input").value

  try {
    entered_lifx_code = entered_lifx_code.replace(/\s/g, "")
  } catch (e) {
    void 0
  }

  useEffect(() => {
    axios
      .get(`http://localhost:${PORT}/psinfo/${entered_lifx_code}`, {})
      .then((res) => {
        localStorage.setItem("psn_refresh_token", res.data.access_code)

        navigate("/lights_verify/")
      })
      .catch((err) => {
        console.log(err)
      })
  }, [entered_lifx_code, navigate])

  return <></>
}
