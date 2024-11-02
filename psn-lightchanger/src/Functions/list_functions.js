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

export function CheckIfLightsChosen(){
    localStorage.getItem()
}

export function IsSetupComplete(){
    const location = useLocation()

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

    localStorage.setItem('lights_chosen', JSON.stringify(lights_chosen))

    if(lights_chosen.length > 0){
        return (
            <Navigate
              to={{ pathname: `/complete/`, state: { from: location } }}
              replace
            />
          );
    }

    
    return(<></>)
}