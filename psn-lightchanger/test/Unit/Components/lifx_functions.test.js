import { cleanup, render } from "@testing-library/react"
import { IsAuth, StoreAvailableLights } from "../../../src/Functions/lifx_functions.js"
import { use } from "react"
import { createMemoryRouter, Route, RouterProvider, useNavigate } from "react-router-dom"

import axios from "axios"

const lifx_code = process.env.REACT_APP_LIFX


const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}))

beforeEach(() => {
    mockedNavigate.mockReset()
})

afterEach(cleanup, 
    sessionStorage.clear())

describe("Test StoreAvailableLights", () => {
    test("Session storage is filled",() => {

        var test_lights_list = ["test_ligh1", "test_light2"]
        StoreAvailableLights(test_lights_list)
        expect(sessionStorage.getItem("lights_avail")).toBe(JSON.stringify(test_lights_list))
    })
})

describe("Test Authentication isAuth", () => {
    //Not Working
    test("Test authentication failure", () => {
        const router = createMemoryRouter([{path: '/', element:<IsAuth/>}])
        var code = "passwrd"
        render(<RouterProvider router={router}/>)

        expect(mockedNavigate).toHaveBeenCalledTimes(0)
    })

    //Not Working
    test("Test Authetication success", () => {
        const router = createMemoryRouter([{path: '/', element:<IsAuth entered_lifx_code={'c798e0d43f3f5caa33d52c3f92909f9948a661eacf4edc2357a293a728f4df7d'}/>}])
        var code = lifx_code
        render(<RouterProvider router={router}/>)
        
        expect(mockedNavigate).toHaveBeenCalledTimes(1)
    })

})