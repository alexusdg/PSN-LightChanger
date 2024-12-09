import { useLocation, Navigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



/**
 * @function VerifyPsnUser Title component
 * @returns an html that changes navigation to /lights_verify
 */
export function VerifyPsnUser(){
    const location = useLocation()
    const navigate = useNavigate()


    var entered_lifx_code = document.querySelector('.token_input').value

    useEffect(() => {

        axios.get(`http://localhost:3100/psinfo/${entered_lifx_code}`, {
        }).then((res) => {

            localStorage.setItem("psn_user_info", res.data.access_code)
                
            navigate("/lights_verify/")
            
        }).catch((err) => {
    
        }) 
    }, [entered_lifx_code])
    
    return(<></>)
}