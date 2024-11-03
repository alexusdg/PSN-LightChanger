
import {Header, SubHeader } from "../Components/interface"

/**
 * 
 * @function SetupComplete will return an HTML indicating setup is complete
 * 
 * @returns an HTML indicating setup is complete
 */
function SetupComplete(){

    return(<div className='full_page' id='primary_color'>   
        <Header/> 
        <div className='sub_content'>
            <div className="setup_complete">
            <SubHeader title={"Setup Complete"}/>
            <SubHeader title={"Happy Gaming"}/>
            </div>
        </div>
    </div>)
}

export default SetupComplete