import {Welcome, Title, GetStartedButton} from "../Components/interface"


function Home(){

    return(<div className='full_page' id='primary_color'>  
                <div className="welcome_content">
                        <Title/>
                        <Welcome/>
                        <GetStartedButton/>
                 
                    </div>
            </div>)
}

export default Home