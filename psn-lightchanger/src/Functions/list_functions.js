import { useLocation, Navigate } from 'react-router-dom'

import { ListLights } from "../Components/interface"

/**
 * 
 * @function ShowLights will use the lights available stored in 
 *           local storage to create an html that will display 
 *           to users the available lights with the design 
 * @returns an html 9f the available lights
 */
export function ShowLights(){

    var lights_avail = JSON.parse(localStorage.getItem('lights_avail'))

    var lights_avail_names = []

    for(var i = 0; i < lights_avail.length; i++){

            lights_avail_names.push(<ListLights key={lights_avail[i].label} light_name={lights_avail[i].label}/>)
    }

    return(<>{lights_avail_names}</>)
}

/**
 * 
 * @function LightChosen will update the color of div clicked 
 *           If light clicked add color, else/or remove the color
 * @returns nothing
 */
export function LightChosen(optionClicked) {

    optionClicked.target.classList.contains('lights_label_chosen') ? optionClicked.target.classList.remove('lights_label_chosen') : optionClicked.target.classList.add('lights_label_chosen');
}

/**
 * 
 * @function CheckIfLightsChosen will use the list of available lights to determine
 *           if the div that contains the respective label as an id contains "lights_label_chosen"
 *           indicating it has been clicked.
 * @returns a list of lights that were chosen, in their original object form
 */
export function CheckIfLightsChosen(){
    var lights_avail = JSON.parse(localStorage.getItem('lights_avail'))
    
    var lights_chosen = []
    
    for(var i = 0; i < lights_avail.length; i++){
        var current_label = lights_avail[i].label

        try{
            if (document.getElementById(`${current_label}`).classList.contains('lights_label_chosen'))
                lights_chosen.push(lights_avail[i])
        }
        finally{
            continue
        }
        
    }

    return lights_chosen
}

/**
 * 
 * @function IsSetupComplete will navigate to complete screen if the list of lights
 *           chosen is greater than 0, indicating that there has been at least one light
 *           to change.
 * @returns nothing
 */
export function IsSetupComplete(){
    const location = useLocation()

    var lights_chosen = CheckIfLightsChosen()

    if(lights_chosen.length > 0){
        localStorage.setItem('lights_chosen', JSON.stringify(lights_chosen))
        return (
            <Navigate
              to={{ pathname: `/complete/`, state: { from: location } }}
              replace
            />
          );
    }
       
    return(<></>)
}