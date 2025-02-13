import { useNavigate } from "react-router-dom"

/**
 * 
 * @function DirectToVerify will direct user to "/lights_verify"
 *           
 * @returns the url to redirect to
 */
export function DirectToVerify(){
    
    return useNavigate("/lights_verify")

}