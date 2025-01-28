import { useState } from "react"
import { DoneButton, Header, SubHeader } from "../Components/interface"
import { ShowLights, IsSetupComplete } from "../Functions/list_functions"

/**
 * @function LifxList list the available lights users can
 *           choose to update
 * @returns an html that shows the list of lights
 */

function LifxList() {
  const [Nav, setNav] = useState(<IsSetupComplete />)

  function NavigateToComplete() {
    setNav(<IsSetupComplete />)
  }

  return (
    <div className="full_page" id="primary_color">
      <Header />
      <div className="sub_header">
        <SubHeader title={"Choose Lights to Change"} />
      </div>
      <div className="sub_content">
        <ShowLights />
        <DoneButton authCheck={NavigateToComplete} />
        {Nav}
      </div>
    </div>
  )
}

export default LifxList
