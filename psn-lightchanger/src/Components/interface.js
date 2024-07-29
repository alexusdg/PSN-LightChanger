import React from "react"
import '../Style/style.css'


export const Header = () => {

    return (<div className='secondary-color' id='header'>
        PSN Light Changer
    </div>)
}


export const subHeader = ({title}) => {

    return (<div className='sub_section'>{title}</div>)
}