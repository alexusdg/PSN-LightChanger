import { cleanup, render } from "@testing-library/react"
import { StoreAvailableLights } from "../../../src/Functions/lifx_functions.js"


afterEach(cleanup, 
    sessionStorage.clear())

jest.mock('', () => ({
    ...jest.requireActual('../../../src/Functions/lifx_functions.js'),
    StoreAvailableLights: jest.fn()
}))


describe("Test StoreAvailableLights", () => {
    test("Session storage is filled",() => {

        var test_lights_list = ["test_ligh1", "test_light2"]
        StoreAvailableLights(test_lights_list)
        expect(sessionStorage.getItem("lights_avail")).toBe(JSON.stringify(test_lights_list))
    })
})