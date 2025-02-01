import { React, useState } from "react"
import { IsAuth } from "../Functions/lifx_functions.js"
import {
  Header,
  SubHeader,
  CircleStep,
  LoginInstruction,
  DoneButton,
} from "../Components/interface.js"
import { VerifyPsnUser } from "../Functions/psn_functions.js"

/**
 * @function LifxVerify will implement a state hook to help determine
 *           if the user has a real token registered with Lifx.
 * @returns html that is used to authenticate Lifx user with token
 */
export const LifxVerify = () => {
  const [Auth, setAuth] = useState(<></>)
  const [code, setCode] = useState("")

  function ToggleAuthCheck() {
    setAuth(<IsAuth entered_lifx_code={code}/>)
  }

  function ToggleAuthCheckFromEnter(e) {
    if (e.key === "Enter") {
      setAuth(<IsAuth entered_lifx_code={code}/>)
    }
  }

  return (
    <div className="full_page" id="primary_color">
      <Header />
      <SubHeader title={"Verify Lifx Account"} />
      <div className="sub_content">
        <div id="test2">
          <div className="instructions">
            <CircleStep number={1} />
            <LoginInstruction
              account={"LIFX"}
              link={"https://cloud.lifx.com/sign_in"}
            />
          </div>
          <div className="instructions">
            <CircleStep number={2} />
            <div className="sub_instruction">
              Use exisistng or re-generate auth token. Enter the token below
            </div>
          </div>
          <div className="instructions">
            <input
              className="token_input"
              type="text"
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => ToggleAuthCheckFromEnter(e)}
            ></input>
          </div>
          <div className="instructions">
            <DoneButton authCheck={ToggleAuthCheck} />
          </div>
          {Auth}
        </div>
      </div>
    </div>
  )
}

/**
 * @function PSNVerify will implement a state hook to help determine
 *           if the user has a real account registed with Sony PlayStation
 * @returns html that is used to authenticate PSN user with nppso cookie
 */
export function PSNVerify() {
  const [nav, setNav] = useState(<></>)
  const [code, setCode] = useState("")

  const ToggleAuthCheck = () => {
    setNav(<VerifyPsnUser entered_psn_code={code}/>)
  }

  function ToggleAuthCheckFromEnter(e) {
    if (e.key === "Enter") {
      setNav(<VerifyPsnUser entered_psn_code={code}/>)
    }
  }

  return (
    <div className="full_page" id="primary_color">
      <Header />
      <SubHeader title={"Verify PSN Account"} />
      <div className="sub_content">
        <div id="test2">
          <div className="instructions">
            <CircleStep number={1} />
            <LoginInstruction
              account={"PSN"}
              link={"https://www.playstation.com/en-us/"}
            />
          </div>
          <div className="instructions">
            <CircleStep number={2} />
            <div className="sub_instruction">
              Enter Auth token found at this link: 
              https://ca.account.sony.com/api/v1/ssocookie
            </div>
          </div>
          <div className="instructions">
            <input
              className="token_input"
              type="text"
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => ToggleAuthCheckFromEnter(e)}
            ></input>
          </div>
          <div className="instructions">
            <DoneButton authCheck={ToggleAuthCheck} />
            {nav}
          </div>
        </div>
      </div>
    </div>
  )
}