import { redirect} from "react-router-dom"

/**
 * 
 * @function DirectToVerify will direct user to "/lights_verify"
 *           
 * @returns the url to redirect to
 */
export async function DirectToVerify(){
    
    return redirect("/lights_verify")

}