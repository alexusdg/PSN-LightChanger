import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

/**
 *
 * @function StoreAvailableLights will store the list of lights returned
 *           in local storage
 * @returns nothing
 */
export function StoreAvailableLights(data) {
  localStorage.setItem("lights_avail", JSON.stringify(data))
}

/**
 * @todo update use effect below to do an api request to the backend
 * @function isAuth will peform a get response to determine if
 *           the token passed in is a valid token.
 *           If the code is valid navigation to ListLights will occur
 *           otherwise it will do nothing
 * @returns nothing
 */
export function IsAuth() {
  const navigate = useNavigate()

  var entered_lifx_code = document.querySelector(".token_input").value

  try {
    entered_lifx_code = entered_lifx_code.replace(/\s/g, "")
  } catch (e) {
    void 0
  }

  const authToken = "Bearer ".concat(entered_lifx_code)

  useEffect(() => {
    if (entered_lifx_code !== "") {
      axios
        .get("https://api.lifx.com/v1/lights/all", {
          headers: {
            Authorization: authToken,
          }
        })
        .then((response) => {
          localStorage.setItem("lifx_token", entered_lifx_code)
          StoreAvailableLights(response["data"])
          navigate("/lights_list/")
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {})
    }
  }, [entered_lifx_code, authToken, navigate])

  return <p>""</p>
}
