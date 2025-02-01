import { cleanup, fireEvent, render, waitFor } from "@testing-library/react"
import { PSNVerify, LifxVerify } from "../../../src/Pages/verify"
import { RENDERS_TEST, CORRECT_FUNCITON_CALLED_ONCLICK_TEST, CORRECT_FUNCITON_CALLED_ONENTER_TEST } from "../../../constants"

require('dotenv').config()

const LIFX_CODE = process.env.REACT_APP_LIFX
const PSN_TOKEN = process.env.REACT_APP_PSN_TOKEN

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
  }))

beforeEach(() => {
    mockedNavigate.mockReset()
})

afterEach(cleanup, jest.clearAllMocks, sessionStorage.clear())


describe("PSNVerify Component", () => {

    test(`${RENDERS_TEST}`, () => {
        render(<PSNVerify/>)
    })

    test(`${CORRECT_FUNCITON_CALLED_ONCLICK_TEST}`, async () => {
        render(<PSNVerify/>)
        
        const done_button_elem = document.querySelector(".done_button")
        const input_elem = document.querySelector(".token_input")
   
        fireEvent.change(input_elem, { target: { value: PSN_TOKEN } })
        fireEvent.click(done_button_elem)
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled()
        })
    })

    test(`${CORRECT_FUNCITON_CALLED_ONENTER_TEST}`, async () => {   
        render(<PSNVerify/>)

        const input_elem = document.querySelector(".token_input")
   
        fireEvent.change(input_elem, { target: { value: PSN_TOKEN } })
        fireEvent.keyDown(input_elem, {key: 'Enter', code: 'Enter'})
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled()
        })
    })
})


describe("LifxVerify Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<LifxVerify/>)
    }) 
    test(`${CORRECT_FUNCITON_CALLED_ONCLICK_TEST}`, async () => {
        render(<LifxVerify/>)

        var done_button_elem = document.querySelector(".done_button")
        const input_elem = document.querySelector(".token_input")
   
        fireEvent.change(input_elem, { target: { value: LIFX_CODE } });
        fireEvent.click(done_button_elem)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled()
        })
    })

    test(`${CORRECT_FUNCITON_CALLED_ONENTER_TEST} 2`, async () => {   
        render(<LifxVerify/>)

        const input_elem = document.querySelector(".token_input")
   
        fireEvent.change(input_elem, { target: { value: LIFX_CODE } })
        fireEvent.keyDown(input_elem, {key: 'Enter', code: 'Enter'})
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled()
        })
    })
})