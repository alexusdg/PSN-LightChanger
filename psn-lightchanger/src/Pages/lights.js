import { React, useState } from 'react'
import { GetLights, IsAuth} from "../Functions/lifx_functions"
import { userInfo } from 'os'
import '../Style/style.css'
import {Header, SubHeader, CircleStep} from '../Components/interface'

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
                <div className='sub_section'>
                    <SubHeader title={"Lifx"}/>
                </div>
                <div className='sub_content'>
                    <CircleStep number={1}/>
                    <CircleStep number={2}/>
                </div>
    </div>)
}


export default LifxLights