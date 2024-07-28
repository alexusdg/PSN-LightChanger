import axios from 'axios'
import { useEffect, useState } from 'react'
//TODO: List all lights

//const tmp_code = 'c798e0d43f3f5caa33d52c3f92909f9948a661eacf4edc2357a293a728f4df7d'
function setToken(token){

  localStorage.removeItem('lifx_token', token)
  localStorage.setItem('lifx_token', token)

}

export function IsAuth(){

  const [auth, setAuth] = useState("")

  var entered_lifx_code = document.getElementById("lifx_auth_code")
  entered_lifx_code = entered_lifx_code.value

  console.log(entered_lifx_code)

  const authToken = 'Bearer '.concat(entered_lifx_code)

  useEffect(() =>{

    axios.get('https://api.lifx.com/v1/lights/all', {
      headers: {
        "Authorization" : authToken
      }
    }).then((response) => {
      setToken(entered_lifx_code)
      setAuth("yes")
    }).catch((err) => {
      setAuth("no")
    }).finally(() => {
    })
  })

  return <p>"verification is {auth}"</p>
}


export function GetLights() {

    const [lights, showLights] = useState([])

    useEffect(() => {
      var ret = []

      async function ListLights(){
        const AuthStr = 'Bearer '.concat(process.env.REACT_APP_LIFX)

        axios.get('https://api.lifx.com/v1/lights/all', {
          headers: {
            "Authorization" : AuthStr
          }
        })
        .then((response) => {
          
          var data = response.data

          for(var i = 0; i < data.length; i++){

              var label_key = data[i].label

              ret.push(<div key={label_key}>{data[i].label}</div>)
          }
  
       })
      .catch((error) => {
          console.log('error ' + error);
          return <>help</>
       })
       .finally(() => {

        showLights(ret)

       })
  
    
      }
      
      
      ListLights()

    }, [])

    return lights
}

//TODO: get current state of light - original color

//TODO: update lights - requires ps functions and google sheets to determine the color change

