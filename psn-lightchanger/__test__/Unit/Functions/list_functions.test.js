import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { CheckIfLightsChosen, IsSetupComplete, ShowLights } from "../../../src/Functions/list_functions"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { CORRECT_TEXT_TEST, EXPECTED_VALUES_IN_SESSION_STORAGE_TEST, RENDERS_TEST, CORRECT_FUNCITON_CALLED_ONCLICK_TEST} from "../../../constants"
import LifxList from "../../../src/Pages/list"
import axios from "axios"
import * as constants from "../../../constants"

import '@testing-library/jest-dom'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
  }))

beforeEach(() => {
    mockedNavigate.mockReset()
})

afterEach(cleanup, jest.clearAllMocks, sessionStorage.clear())

describe("Show Lights Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<ShowLights/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        sessionStorage.setItem("lights_avail", JSON.stringify([{label : "label1"}, {label : "label2"}]))

        render(<ShowLights/>)
        const light_elem = screen.getByText("label1")
        const light_elem2 = screen.getByText("label2")

        expect(light_elem).toBeInTheDocument()
        expect(light_elem2).toBeInTheDocument()

    })
})

describe("Check If Lights Chosen Component", () => {
    test(`${EXPECTED_VALUES_IN_SESSION_STORAGE_TEST}`, () => {
        sessionStorage.setItem("lights_avail", JSON.stringify([{label : "label1", id : 1}, {label : "label2", id : 2}]))
        render(<ShowLights/>)

        var light_elem = document.getElementById("label1")
        fireEvent.click(light_elem)

        CheckIfLightsChosen()

        expect(sessionStorage).toHaveProperty("lights_chosen")
        expect(sessionStorage.getItem("lights_chosen")).toContain("1")
    })
})

describe("Is Setup Complete Component", () => {
    const router = createMemoryRouter([{path : '/', element : <IsSetupComplete/>}])
    test(`${RENDERS_TEST}`, async() => {

        render(<RouterProvider router={router}/>)
    })

    test(`${CORRECT_FUNCITON_CALLED_ONCLICK_TEST}`, async () => {
        sessionStorage.setItem("lights_avail", JSON.stringify([{label : "label1", id : 1}, {label : "label2", id : 2}]))
        const spy = jest.spyOn(axios, 'put').mockImplementation()

        render(<LifxList/>)

        const done_button_elem = document.querySelector(".done_button")
        fireEvent.click(done_button_elem)

        await waitFor(() => {
            expect(spy).toHaveBeenCalled()
            expect(mockedNavigate).toHaveBeenCalled()
        })
    })
})