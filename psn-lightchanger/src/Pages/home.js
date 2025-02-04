import { Welcome, Title, GetStartedButton, Info } from "../Components/interface"

/**
 * @function Home will return an HTML of home layout
 *
 * @returns an HTML
 */
function Home() {
  return (
    <div className="full_page" id="primary_color">
       <Info/>
      <div className="welcome_content">
        <Title />
        <Welcome />
        <GetStartedButton page={"/psn_verify"} />
      </div>
    </div>
  )
}

export default Home
