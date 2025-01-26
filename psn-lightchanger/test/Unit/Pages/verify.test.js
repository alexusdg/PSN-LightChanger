import { cleanup, fireEvent, render } from "@testing-library/react"
import { PSNVerify, LifxVerify } from "../../../src/Pages/verify"

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

afterEach(cleanup, jest.clearAllMocks)

describe("PSNVerify Component", () => {
    test(`${RENDERS_TEST}`, () => {
      
        render(<PSNVerify/>)

        //const elem = document.querySelector(".done_button")
        //fireEvent.click(elem)

    })
})

describe("LIFXVerify Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<LifxVerify/>)

    })
})