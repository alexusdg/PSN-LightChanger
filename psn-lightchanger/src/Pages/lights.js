import { React, useState } from 'react'
import { GetLights, IsAuth} from "../Functions/lifx_functions"
import { userInfo } from 'os'

function setToken(token){

    localStorage.removeItem('lifx_token', token)
    localStorage.setItem('lifx_token', token)

}
function LifxLights() {

    const [authComp, setAuthComp] = useState(<></>)

    const handleInput = (event) => {

        setAuthComp(<IsAuth/>)
    }

    return(<div><input id='lifx_auth_code' type="text" defaultValue=""/>
                <button type="button" value="submit" onClick={handleInput}/>
                 {authComp}
    </div>)
}


export default LifxLights