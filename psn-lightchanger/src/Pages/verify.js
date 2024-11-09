import { React, useState } from 'react'
import { IsAuth } from "../Functions/lifx_functions.js"
import {Header, SubHeader, CircleStep, LoginInstruction, DoneButton} from '../Components/interface.js'
import axios from 'axios'
import '../Style/style.css'
import 'isomorphic-fetch';


/**
 * @function LifxVerify will implement a state hook to help determine 
 *           if the user has a real token registered with Lifx.
 * @returns html that is used to authenticate Lifx user with token
 */

export function LifxVerify() {

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


export function PSNVerify(){


    function ToggleAuthCheck(){
        
        var entered_lifx_code = document.querySelector('.token_input').value
        axios.get(`http://localhost:3100/psinfo/${entered_lifx_code}`, {
        }).then((res) => {

            console.log(res.data)
        }).catch((err) => {

            console.log(err.data)
        })
        
    }

    return(<div className='full_page' id='primary_color'>
            <Header/> 
                <div className='sub_header'>
                    <SubHeader title={"Verify PSN Account"}/>
                </div>
                <div className='sub_content'>
                    <div id='test2'>
                        <div  className='instructions'> 
                            <CircleStep number={1}/>
                                <div className='sub_instruction'>
                                    <LoginInstruction account={"PSN"} link={"https://www.playstation.com/en-us/"}/>
                                </div>
                        </div>
                        <div className='instructions'>
                            <CircleStep number={2}/>
                            <div className='sub_instruction'>Enter Auth token found at the link below
                                    https://ca.account.sony.com/api/v1/ssocookie</div>
                        </div>
                        <div className='instructions'>
                                <input className='token_input' type='text'></input>
                        </div>
                        <div className='instructions'>
                                <DoneButton authCheck={ToggleAuthCheck}/>
                        </div>
                    </div>
                </div>
            </div>)
}