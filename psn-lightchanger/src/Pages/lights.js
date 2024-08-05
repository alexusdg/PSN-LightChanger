import { React, useState } from 'react'
import { GetLights, IsAuth} from "../Functions/lifx_functions"
import { userInfo } from 'os'
import '../Style/style.css'
import {Header, SubHeader, CircleStep, LoginInstruction, DoneButton} from '../Components/interface'

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
                <div className='sub_header'>
                    <SubHeader title={"Lifx"}/>
                </div>
                <div className='sub_content'>
                    <div id='test2'>
                        <div  className='instructions'> 
                            <CircleStep id='test' number={1}/>
                                <div id='test'>
                                    <LoginInstruction account={"LIFX"} link={"https://cloud.lifx.com/sign_in"}/>
                                </div>
                        </div>
                        <div className='instructions'>
                            <CircleStep id='test' number={2}/>
                            <div id='test'>Use exisistng or re-generate auth token. Enter the token below</div>
                        </div>
                        <div className='instructions'>
                                <input className='input' type='text'></input>
                        </div>
                        <div className='instructions'>
                                <DoneButton/>  
                        </div>
                    </div>
                </div>
    </div>)
}


export default LifxLights