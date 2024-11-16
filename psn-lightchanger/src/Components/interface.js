import React from "react"
import { LightChosen } from "../Functions/list_functions"
import { useNavigate } from "react-router-dom"

/**
 * @returns the Title component
 */
export const Title = () => {

    return(<div id="title">PSN Light Changer</div>)
}

/**
 * @returns the Welcome component
 */
export const Welcome = () => {

    return(<div id="welcome">Welcome</div>)
}

/**
 * @returns the header used across most pages
 */
export const Header = () => {

    return (<div className='header' id='secondary_color'>
        PSN Light Changer
    </div>)
}

/**
 * 
 * @param {{ string }} page - page to direct user to after clicking button
 * @returns the get started button, with onclick functionality to navigate to 
 *          the requested page
 */

export const GetStartedButton = ( { page } ) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(page)
    }

    return(<div id="get_started" onClick={handleClick}>Get Started</div>)
}

/**
 * 
 * @param {{ string }} title - title used for subheader
 * @returns html for the sub header used across pages
 * 
 */
export function SubHeader({ title }) {

    return (<div id="sub_header">{title}</div>)
}

/**
 * 
 * @param {{ string }} account - account type to verify login
 * @param {{ string }} link - link to account
 * @returns html for Login instructions to be followed
 * 
 */
export function LoginInstruction({ account, link}){

    return (<div className="sub_instruction">Login to {account} : {link}</div>)
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
export function ListLights( {light_name}  ){

    return (<div className="lights_label" id={light_name} onClick={e => LightChosen(e)}>{light_name}</div>)
}