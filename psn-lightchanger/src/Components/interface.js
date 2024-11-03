import React from "react"
import '../Style/style.css'
import { LightChosen } from "../Functions/list_functions"


export const Title = () => {

    return(<div id="title"> PSN Light Changer</div>)
}

export const Welcome = () => {

    return(<div id="welcome"> Welcome </div>)
}

/**
 * @returns the header used across most pages
 */

export const Header = () => {

    return (<div className='header' id='secondary_color'>
        PSN Light Changer
    </div>)
}

export const GetStartedButton = () => {

    return(<div id="get_started"> Get Started </div>)
}


/**
 * 
 * @param {{ string }} title - title used for subheader
 * @returns html for the sub header used across pages
 * 
 */
export function SubHeader({ title }) {

    return (<div>{title}</div>)
}

/**
 * 
 * @param {{ string, }} account - account type to verify login
 * @param {{ string }} link - link to account
 * @returns html for Login instructions to be followed
 * 
 */
export function LoginInstruction({ account, link}){

    return (<>Login to {account} : {link} </>)
}

/**
 * 
 * @param {{ string }} number - number for next instruction step
 * @returns html for the number associated with step in instructions
 * 
 */
export function CircleStep( { number } ) {

    return (<div className="circle_step"  id="primary_color">
                <div className="number">
                    {number}
                </div>
            </div>)
}

/**
 * 
 * @param {{ function }} authCheck - function to be ran when done button is clicked 
 * @returns html for the done button used across pages
 * 
 */
export function DoneButton({authCheck}){ 

    return (<div className='done_button' onClick={authCheck}>Done</div>)
}

/**
 * 
 * @param {{string}} light_name - name of light assigned 
 * @returns html for the light, implementing expected design 
 */
export function ListLights( {light_name} ){

    return (<div className="lights_label" id={light_name} onClick={e => LightChosen(e)}>{light_name}</div>)
}