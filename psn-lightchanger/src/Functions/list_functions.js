import { useNavigate } from "react-router-dom"
import { ListLights } from "../Components/interface"
import axios from "axios"
import { useEffect } from "react"

/**
 * @function ShowLights will use the lights available stored in
 *           local storage to create an html that will display
 *           to users the available lights with the design
 * @returns an html 9f the available lights
 */
export function ShowLights() {
  var lights_avail = JSON.parse(sessionStorage.getItem("lights_avail"))
  var lights_avail_names = []

  if (lights_avail === null) return <></>

  for (var i = 0; i < lights_avail.length; i++) {
    lights_avail_names.push(
      <ListLights
        key={lights_avail[i].label}
        light_name={lights_avail[i].label}
      />,
    )
  }

  return <>{lights_avail_names}</>
}

/**
 * @function CheckIfLightsChosen will use the list of available lights to determine
 *           if the div that contains the respective label as an id contains "lights_label_chosen"
 *           indicating it has been clicked.
 * @returns a list of lights that were chosen, in their original object form
 */
export function CheckIfLightsChosen() {
  var lights_avail = JSON.parse(sessionStorage.getItem("lights_avail"))
  var lights_chosen = []

  for (var i = 0; i < lights_avail.length; i++) {
    var current_label = lights_avail[i].label

    try {
      if (
        document
          .getElementById(`${current_label}`)
          .classList.contains("lights_label_chosen")
      )
        lights_chosen.push(JSON.stringify(`${lights_avail[i].id}`))
    } finally {
      continue
    }
  }

  sessionStorage.setItem("lights_chosen", JSON.stringify(lights_chosen))
}

/**
 * @function IsSetupComplete will navigate to complete screen if the list of lights
 *           chosen is greater than 0, indicating that there has been at least one light
 *           to change.
 *           Before navigating the functions will make the api requests to create the processes
 *           for the lights
 * @returns an empty html
 */
export function IsSetupComplete() {
  const navigate = useNavigate()
  const PORT = process.env.NODE_ENV.REACT_APP_BACKEND_PORT
  const BASE_URL = process.env.NODE_ENV.REACT_APP_BASE_URL

  useEffect(() => {
    CheckIfLightsChosen()

    var lights_chosen = sessionStorage.getItem("lights_chosen")

    if (lights_chosen.length > 0) {
      axios.put(`http://${BASE_URL}:${PORT}/create_process/`, null, {
        params: {
          lifx_token: `${sessionStorage.getItem("lifx_token")}`,
          psn_token: `${sessionStorage.getItem("psn_refresh_token")}`,
          lifx_ids: `${lights_chosen}`,
        },
      })

      navigate("/complete/")
    }
  }, [PORT, navigate])
  return <></>
}
