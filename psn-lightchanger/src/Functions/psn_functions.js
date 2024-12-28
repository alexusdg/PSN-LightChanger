import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

const PORT = process.env.REACT_APP_BACKEND_PORT

/**
 * @function VerifyPsnUser Title component
 *
 * @returns an html that changes navigation to /lights_verify
 */
export function VerifyPsnUser({entered_psn_code}) {
  const navigate = useNavigate()

  var entered_psn_code = document.querySelector(".token_input").value

  try {
    entered_psn_code = entered_psn_code.replace(/\s/g, "")
  } catch (e) {
    void 0
  }

  useEffect(() => {
    axios
      .get(`http://localhost:${PORT}/ps_auth/`, {
        params: { npsso: `${entered_psn_code}` },
      })
      .then((res) => {
        sessionStorage.setItem("psn_refresh_token", res.data.refresh_token)

        navigate("/lights_verify/")
      })
      .catch((err) => {
        console.log(err)
      })
  }, [entered_psn_code, navigate])

  return <></>
}
