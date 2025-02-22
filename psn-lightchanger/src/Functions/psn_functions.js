import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

/**
 * @function VerifyPsnUser Title component
 *
 * @returns an html that changes navigation to /lights_verify
 */
export function VerifyPsnUser({ entered_psn_code }) {
  const PORT = process.env.NODE_ENV.REACT_APP_BACKEND_PORT
  const BASE_URL = process.env.NODE_ENV.REACT_APP_BASE_URL
  const navigate = useNavigate()

  try {
    entered_psn_code = entered_psn_code.replace(/\s/g, "")
  } catch (e) {
    void 0
  }

  useEffect(() => {
    axios
      .get(`http://${BASE_URL}:${PORT}/ps_auth/`, {
        params: { npsso: `${entered_psn_code}` },
      })
      .then((res) => {
        sessionStorage.setItem("psn_refresh_token", res.data.refresh_token)
        navigate("/lights_verify/")
      })
      .catch((err) => {
        console.log(err)
      })
  }, [entered_psn_code, PORT, navigate])

  return <></>
}
