import { Header, SubHeader } from "../Components/interface"
import { ShowLights } from "../Functions/list_functions"

function LifxList() {

    
    return(<div className='full_page' id='primary_color'>   
            <Header/> 
            <div className='sub_header'>
                    <SubHeader title={"Choose Lights to Change"}/>
            </div>
            <div className='sub_content'>
                        <ShowLights/>
                    </div>
    </div>)
}

export default LifxList