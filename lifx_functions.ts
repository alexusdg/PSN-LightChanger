import axios from 'axios'
require('dotenv').config();



const get_lights = async () => {
    const AuthStr = 'Bearer '.concat(`${process.env.ENV_LIFX}`)

    axios.get('https://api.lifx.com/v1/lights/all', {
        headers: {
          "Authorization" : AuthStr
        }
      })
      .then(response => {
        // If request is good...
        console.log(response.data);
     })
    .catch((error) => {
        console.log('error ' + error);
     });
}

const set_light = async () => {
    const AuthStr = 'Bearer '.concat(`${process.env.ENV_LIFX}`)

    axios.put('https://api.lifx.com/v1/lights/all/state', 
        {
            "power": "on",
            "color": "yellow saturation:0.8",
            "brightness": 0.5,
            "duration": 2
          },
        {
            headers: {
            "Authorization" : AuthStr
          }
    })
}

//get_lights()
//color_info()
set_light()