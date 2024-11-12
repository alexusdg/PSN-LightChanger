import { useLocation, Navigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"


/**
 * @function VerifyPsnUser Title component
 * @returns an html that changes navigation to /lights_verify
 */
export function VerifyPsnUser(){
    const location = useLocation()
    const [auth, setAuth] = useState()

    var entered_lifx_code = document.querySelector('.token_input').value

    useEffect(() => {

        axios.get(`http://localhost:3100/psinfo/${entered_lifx_code}`, {
        }).then((res) => {
    
            localStorage.setItem("psn_user_info", JSON.stringify(res.data))
    
            setAuth("yes")
            
            
        }).catch((err) => {
    
            setAuth("no")
        }) 
    })

    if(auth === "yes"){

        return(<Navigate
            to={{ pathname: `/lights_verify/`, state: { from: location } }}
            replace
        />)
    }
    
    return(<></>)
}