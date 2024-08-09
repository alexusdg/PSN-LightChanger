import React from "react"
import '../Style/style.css'

export const Header = () => {

    return (<div className='header' id='secondary_color'>
        PSN Light Changer
    </div>)
}


export function SubHeader({ title }) {

    return (<>Verify {title} Account</>)
}

export function LoginInstruction({ account, link}){

    return (<>Login to {account} : {link} </>)
}

export function CircleStep( { number } ) {

    return (<div className="circle_step"  id="primary_color">
                <div className="number">
                    {number}
                </div>
            </div>)
}

export function DoneButton({authCheck}){

    return (<div className='done_button' onClick={authCheck}>Done</div>)
}