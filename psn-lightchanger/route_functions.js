const axios = require('axios').default

const routeFunc = {

    updateLight(res, authToken, light_id, color_data){
      const options = {
        method: "PUT",
        url: `https://api.lifx.com/v1/lights/${light_id}/state`,
        headers: {
          accept: "text/plain",
          "content-type": "application/json",
          Authorization: authToken,
        },
        data: {
          color: `hue:${color_data.hue} saturation:${color_data.saturation} kelvin:${color_data.kelvin}`,
          duration: "1",
        }
      }
      axios
        .request(options)
        .then(() => {res.status(200).send({status : "ok"})})
        .catch((err) => {res.status(500).send({error : err})})
    }
}


module.exports = {routeFunc}