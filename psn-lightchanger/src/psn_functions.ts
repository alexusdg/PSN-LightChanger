import { exchangeCodeForAccessToken } from "psn-api";
import { getBasicPresence } from "psn-api";
import {exchangeNpssoForCode} from "psn-api"
require('dotenv').config();



export const currentlyPlaying = async () => {

    const myNpsso = `${process.env.ENV_AUTH}`

console.log(myNpsso)
// We'll exchange your NPSSO for a special access code.
const accessCode = await exchangeNpssoForCode(myNpsso);

// 🚀 We can use the access code to get your access token and refresh token.
const authorization = await exchangeCodeForAccessToken(accessCode);

const response = await getBasicPresence(authorization, "me"); //todo: take in account id to replace me

//console.log(response)

var json_res = JSON.parse(JSON.stringify(response))


console.log(json_res.basicPresence.gameTitleInfoList[0].titleName)

}

currentlyPlaying()