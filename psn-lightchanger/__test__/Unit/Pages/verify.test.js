import { cleanup, fireEvent, render, waitFor } from "@testing-library/react"
import { PSNVerify, LifxVerify } from "../../../src/Pages/verify"
import { createMemoryRouter, RouterProvider } from "react-router-dom"

require('dotenv').config()

const RENDERS_TEST = "Renders"
const PSN_TOKEN = process.env.REACT_APP_PSN_TOKEN

const mockedNavigate = jest.fn()
const VerifyPSNUser = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
  }))



beforeEach(() => {
    mockedNavigate.mockReset()
})

afterEach(cleanup, jest.clearAllMocks, sessionStorage.clear())

describe("PSNVerify Component", () => {
    test(`${RENDERS_TEST}`, async () => {
      
        render(<PSNVerify/>)

        var elem = document.querySelector(".done_button")
        const elem_input = document.querySelector(".token_input")
   
        fireEvent.change(elem_input, { target: { value: PSN_TOKEN } });
        fireEvent.click(elem)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled()
        })
    })

    test(`${RENDERS_TEST} 2`, async () => {
      
        render(<PSNVerify/>)

        var elem = document.querySelector(".done_button")
        const elem_input = document.querySelector(".token_input")
   
        fireEvent.change(elem_input, { target: { value: PSN_TOKEN } })
        fireEvent.keyDown(elem_input, {key: 'Enter', code: 'Enter'})

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled()
        })
    })
})

/*describe("LIFXVerify Component", () => {
    test(`${RENDERS_TEST}`, () => {
        //render(<LifxVerify/>)
        expect(1).toBe(1)
    })
})*/
