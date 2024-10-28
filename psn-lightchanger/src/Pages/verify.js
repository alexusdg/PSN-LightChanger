import { React, useState } from 'react'
import { IsAuth } from "../Functions/lifx_functions"
import {Header, SubHeader, CircleStep, LoginInstruction, DoneButton} from '../Components/interface'
import '../Style/style.css'

/**
 * @function LifxVerify will implement a state hook to help determine 
 *           if the user has a real token registered with Lifx.
 * @returns html that is used to authenticate Lifx user with token
 */

function LifxVerify() {

    const [Auth, setAuth] = useState(<IsAuth/>)

    function ToggleAuthCheck(){
        
        setAuth(<IsAuth/>)
    }

    function ToggleAuthCheckFromEnter(e){

        if(e.key === 'Enter'){

            setAuth(<IsAuth/>)
        } 
    }

    return(<div className='full_page' id='primary_color'>
            <Header/> 
                <div className='sub_header'>
                    <SubHeader title={"Verify Lifx Account"}/>
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
                                <input className='token_input' type='text' onKeyDown={(e) => ToggleAuthCheckFromEnter(e)}></input>
                        </div>
                        <div className='instructions'>
                                <DoneButton authCheck={ToggleAuthCheck}/>  
                        </div>
                        {Auth}
                    </div>
                </div>
    </div>)
}


export default LifxVerify