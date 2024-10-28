import { ListLights } from "../Components/interface"

export function ShowLights(){

    var lights_avail = JSON.parse(localStorage.getItem('lights_avail'))

    var lights_avail_names = []

    for(var i = 0; i < lights_avail.length; i++){

            lights_avail_names.push(<ListLights key={lights_avail[i].label} light_name={lights_avail[i].label}/>)
    }

    return(<>{lights_avail_names}</>)
}


export function LightChosen(optionClicked) {

    optionClicked.target.classList.contains('lights_label_chosen') ? optionClicked.target.classList.remove('lights_label_chosen') : optionClicked.target.classList.add('lights_label_chosen');
}