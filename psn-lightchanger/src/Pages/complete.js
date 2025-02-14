import { Header, Feedback } from "../Components/interface"

/**
 * @function SetupComplete will return an HTML indicating setup is complete
 *
 * @returns an HTML indicating setup is complete
 */
function SetupComplete() {
  return (
    <div className="full_page" id="primary_color">
      <Header />
      <div className="sub_content">
        <div className="setup_complete">
          <p>
            Setup Complete <br />
            Happy Gaming{" "}
          </p>
          <p>
            This app is still in development. <br />
            This app will update light colors for the next 15 minutes. <br />
          </p>
          <p>
            Games this app will work with: <br />
            Marvel Rivals, Marvel's Spider-Man 2, Mortal Kombat 11, Ultimate
            Chicken Horse
            <br />
          </p>
          <p>
            Not Working? <br />
            Make sure your PlayStation status is ONLINE
          </p>
        </div>
      </div>
      <Feedback />
    </div>
  )
}

export default SetupComplete
