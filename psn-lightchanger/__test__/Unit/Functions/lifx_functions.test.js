import { cleanup, render, waitFor } from "@testing-library/react"
import { IsAuth, StoreAvailableLights } from "../../../src/Functions/lifx_functions.js"

require('dotenv').config()

const LIFX_CODE = process.env.REACT_APP_LIFX

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

describe("Test Authentication IsAuth", () => {
    test("Test Authentication Failure", async () => {
        render(<IsAuth/>)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledTimes(0)
        })  

    })

    test("Test Authentication Failure", async () => {
        render(<IsAuth entered_lifx_code={""}/>)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledTimes(0)
        })  

    })

    test("Test Authentication success", async () => {
        render(<IsAuth entered_lifx_code={LIFX_CODE}/>)

        await waitFor(() => {   
            expect(mockedNavigate).toHaveBeenCalled()
            expect(mockedNavigate).toHaveBeenCalledTimes(1)
            expect(mockedNavigate).toHaveBeenCalledWith('/lights_list/')
            expect(sessionStorage.getItem("lifx_token")).toBe(LIFX_CODE)
        })  
    })
})