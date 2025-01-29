import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

/**
 * @function VerifyPsnUser Title component
 *
 * @returns an html that changes navigation to /lights_verify
 */
export function VerifyPsnUser({entered_psn_code}) {
  const PORT = process.env.REACT_APP_BACKEND_PORT
  const navigate = useNavigate()

  try {
    entered_psn_code = entered_psn_code.replace(/\s/g, "")
  } catch (e) {
    void 0
  }
  console.log(entered_psn_code)


  useEffect(() => {
    axios
      .get(`http://localhost:${PORT}/ps_auth/`, {
        params: { npsso: `${entered_psn_code}` },
      })
      .then((res) => {
        sessionStorage.setItem("psn_refresh_token", res.data.refresh_token)
        console.log("HEREEEEEEEEEEE")
        navigate("/lights_verify/")
      })
      .catch((err) => {
        //console.log(err)
      })
  }, [entered_psn_code, navigate])

  return <></>
}
