import { ListLights } from "../Components/interface"

export function ShowLights(){

    var lights_avail = JSON.parse(localStorage.getItem('lights_avail'))

    var lights_avail_names = []

    for(var i = 0; i < lights_avail.length; i++){

            lights_avail_names.push(<ListLights light_name={lights_avail[i].label}/>)
            lights_avail_names.push(<ListLights light_name={lights_avail[i].label}/>)
            lights_avail_names.push(<ListLights light_name={lights_avail[i].label}/>)
    }

    return(<>{lights_avail_names}</>)
}