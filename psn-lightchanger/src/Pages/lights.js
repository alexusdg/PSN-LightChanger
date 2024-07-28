import { React, useState } from 'react'
import { GetLights, IsAuth} from "../Functions/lifx_functions"
import { userInfo } from 'os'
import '../Style/style.css'
import {Header} from '../Components/interface'

// <input id='lifx_auth_code' type="text" defaultValue=""/>
// <button type="button" value="submit" onClick={handleInput}/>
//{authComp}

function LifxLights() {

    const [authComp, setAuthComp] = useState(<></>)

    const handleInput = (event) => {

        setAuthComp(<IsAuth/>)
    }

    return(<div className='full_page primary-color'>
            <Header/> 
    </div>)
}


export default LifxLights