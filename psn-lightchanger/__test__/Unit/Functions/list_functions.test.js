import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { CheckIfLightsChosen, IsSetupComplete, ShowLights } from "../../../src/Functions/list_functions"
import '@testing-library/jest-dom'
import SetupComplete from "../../../src/Pages/complete"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { ListLights } from "../../../src/Components/interface"
import axios from "axios"
import LifxList from "../../../src/Pages/list"

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
  }))

beforeEach(() => {
    mockedNavigate.mockReset()
})

afterEach(cleanup, jest.clearAllMocks, sessionStorage.clear())

describe("ShowLights Component", () => {
    test("test2", () => {

        render(<ShowLights/>)
    })

    test("test2", () => {
        sessionStorage.setItem("lights_avail", JSON.stringify([{label : "label1"}, {label : "label2"}]))

        render(<ShowLights/>)
        const light_elem = screen.getByText("label1")
        const light_elem2 = screen.getByText("label2")
        expect(light_elem).toBeInTheDocument()
        expect(light_elem2).toBeInTheDocument()
        //var light_elem = document.querySelector("#label1")
        //fireEvent.click()
    })
})

describe("CheckIfLightsChosen Function", () => {

    test("test 1", () => {
        sessionStorage.setItem("lights_avail", JSON.stringify([{label : "label1", id : 1}, {label : "label2", id : 2}]))
        render(<ShowLights/>)

        var light_elem = document.getElementById("label1")
        fireEvent.click(light_elem)

        CheckIfLightsChosen()

        expect(sessionStorage).toHaveProperty("lights_chosen")
        expect(sessionStorage.getItem("lights_chosen")).toContain("1")
    })
})

describe("Test IsSetupComplete Componenet", () => {
    const router = createMemoryRouter([{path : '/', element : <IsSetupComplete/>}])
    test("3", async() => {

        render(<RouterProvider router={router}/>)
    })

    test("test4", async () => {
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