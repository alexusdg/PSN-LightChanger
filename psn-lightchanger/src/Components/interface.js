import React from "react"
import '../Style/style.css'


export const Header = () => {

    return (<div className='secondary-color' id='header'>
        PSN Light Changer
    </div>)
}


export function SubHeader({ title }) {

    return (<>Verify {title} Account</>)
}

export function CircleStep( { number } ) {

    return (<div className="circle_step">
                <div className="number">
                    {number}
                </div>
            </div>)
}