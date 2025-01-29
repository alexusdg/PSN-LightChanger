import { cleanup, render, waitFor } from "@testing-library/react"
import { VerifyPsnUser } from "../../../src/Functions/psn_functions.js"

require('dotenv').config()

const PSN_TOKEN = process.env.REACT_APP_PSN_TOKEN

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

describe("Test Authentication VerifyPSNUser", () => {
    test("Test Authentication Failure", async() => {
        render(<VerifyPsnUser/>)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledTimes(0)
        })
    })

    test("Test Authentication Success", async() => {
        render(<VerifyPsnUser entered_psn_code={PSN_TOKEN}/>)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalled()
            expect(mockedNavigate).toHaveBeenCalledTimes(1)
            expect(mockedNavigate).toHaveBeenCalledWith('/lights_verify/')
            expect(sessionStorage).toHaveProperty("psn_refresh_token")
        })
    })
})