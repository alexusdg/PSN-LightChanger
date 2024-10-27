import React from "react"
import '../Style/style.css'

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
 * @param {{ string }} title - title used for subheader
 * @returns html for the sub header used across pages
 * 
 */
export function SubHeader({ title }) {

    return (<>{title}</>)
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
 * @param {{ string }} title 
 * @returns html for the header used across pages
 * 
 */
export function DoneButton({authCheck}){ 

    return (<div className='done_button' onClick={authCheck}>Done</div>)
}

export function ListLights( {light_name} ){

    return (<div className="lights_label">{light_name}</div>)
}