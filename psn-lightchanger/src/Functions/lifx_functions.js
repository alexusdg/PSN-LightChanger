import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

// * TODO: Update the function desc
export function StoreAvailableLights(data){

    localStorage.setItem('lights_avail', JSON.stringify(data))

    //console.log(JSON.parse(localStorage.getItem('lights_avail')))

}

/**
 * TODO: Update the function desc
 * @function isAuth will peform a get response to determine if
 *           the token passed in is a valid token.
 *           If the code is valid navigation to ListLights will occur
 *           otherwise it will do nothing
 * @returns nothing
 */
export function IsAuth(){

  const [auth, setAuth] = useState()
  const location = useLocation()

  var entered_lifx_code = document.querySelector('.token_input')

  try{
    entered_lifx_code = entered_lifx_code.value
    entered_lifx_code = entered_lifx_code.replace(/\s/g, "");
  }catch(e){
    void(0)
  }

  const authToken = 'Bearer '.concat(entered_lifx_code)

  useEffect(() =>{
    
    if (entered_lifx_code === ""){
      setAuth("no")
    }
    else{

      axios.get('https://api.lifx.com/v1/lights/all', {
        headers: {
          "Authorization" : authToken
        }
      }).then((response) => {
        localStorage.setItem('lifx_token', entered_lifx_code)
        console.log("yes")
        setAuth("yes")
        StoreAvailableLights(response["data"])
      }).catch((err) => {
        setAuth("no")
        console.log("no")
      }).finally(() => {

        
      })
    }
  }, [entered_lifx_code, authToken])

  if(auth === "yes"){

    return (
      <Navigate
        to={{ pathname: `/lights_list/`, state: { from: location } }}
        replace
      />
    );
  }
  return <p>""</p>
}
