import { React, useState } from 'react'
import { GetLights, IsAuth} from "../Functions/lifx_functions"
import { userInfo } from 'os'
import '../Style/style.css'
import {Header, SubHeader, CircleStep, LoginInstruction, DoneButton} from '../Components/interface'

// <input id='lifx_auth_code' type="text" defaultValue=""/>
// <button type="button" value="submit" onClick={handleInput}/>
//{authComp}



function LifxLights() {

    const [Auth, setAuth] = useState(<IsAuth/>)


    function ToggleAuthCheck(){
        
        setAuth(<IsAuth/>)
    }

    return(<div className='full_page' id='primary_color'>
            <Header/> 
                <div className='sub_header'>
                    <SubHeader title={"Lifx"}/>
                </div>
                <div className='sub_content'>
                    <div id='test2'>
                        <div  className='instructions'> 
                            <CircleStep number={1}/>
                                <div className='sub_instruction'>
                                    <LoginInstruction account={"LIFX"} link={"https://cloud.lifx.com/sign_in"}/>
                                </div>
                        </div>
                        <div className='instructions'>
                            <CircleStep number={2}/>
                            <div className='sub_instruction'>Use exisistng or re-generate auth token. Enter the token below</div>
                        </div>
                        <div className='instructions'>
                                <input className='token_input' type='text'></input>
                        </div>
                        <div className='instructions'>
                                <DoneButton authCheck={ToggleAuthCheck}/>  
                        </div>
                        {Auth}
                    </div>
                </div>
    </div>)
}


export default LifxLights