import {
  Welcome,
  Title,
  GetStartedButton,
  Info,
  Feedback,
} from "../Components/interface"
import { useState } from "react"

/**
 * @function Home will return an HTML of home layout
 *
 * @returns an HTML
 */
function Home() {
  const [popup, setPopup] = useState("")

  return (
    <div className="full_page" id="primary_color">
      <meta name="title" content="PSN-LightChanger"/>
      <meta name="description" content="This is a web application that changes the color of your smart lights based on the game you are currently playing on PlayStation" />
      <meta name="keywords" content="psn, light changer, lifx, playstation"/>
      <Info setPopupWith={setPopup} currentVal={popup} />
      <div className="welcome_content">
        <Title/>
        {popup}
        <Welcome />
        <GetStartedButton page={"/psn_verify"} />
      </div>
      <Feedback />
    </div>
  )
}

export default Home
