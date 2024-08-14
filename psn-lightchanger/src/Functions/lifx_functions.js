import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

function setToken(token){

  localStorage.removeItem('lifx_token', token)
  localStorage.setItem('lifx_token', token)

}

export function IsAuth(){

  const [auth, setAuth] = useState()
  const [res, setRes] = useState()
  const location = useLocation()

  var entered_lifx_code = document.querySelector('.token_input')

  try{
    entered_lifx_code = entered_lifx_code.value
    entered_lifx_code = entered_lifx_code.replace(/\s/g, "");
  }catch(e){
    void(0)
  }

  const authToken = 'Bearer '.concat(entered_lifx_code)

  console.log(entered_lifx_code)

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
        setToken(entered_lifx_code)
        console.log("yes")
        setRes(response)
        setAuth("yes")
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
        to={{ pathname: `/lights/${res}`, state: { from: location } }}
        replace
      />
    );
  }
  return <p>""</p>
}
