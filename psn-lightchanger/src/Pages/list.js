import { DoneButton, Header, SubHeader } from "../Components/interface"
import { ShowLights } from "../Functions/list_functions"

/**
 * 
 * @function LifxList list the available lights users can 
 *           choose to update
 * @returns an html that shows the list of lights
 */

function LifxList() {
    return(<div className='full_page' id='primary_color'>   
            <Header/> 
            <div className='sub_header'>
                    <SubHeader title={"Choose Lights to Change"}/>
            </div>
            <div className='sub_content'>
                    <ShowLights/>
                    <DoneButton/>
            </div>
    </div>)
}

export default LifxList