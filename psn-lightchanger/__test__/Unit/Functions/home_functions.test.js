import { cleanup, render } from "@testing-library/react"
import { DirectToVerify } from "../../../src/Functions/home_functions"
import { useNavigate } from "react-router-dom"
import { RENDERS_TEST } from "../../../constants"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }))

afterEach(cleanup)

describe("Direct Verify Component", ()=> {

    test(RENDERS_TEST, () => {
        render(<DirectToVerify/>)
        expect(useNavigate).toHaveBeenCalledTimes(1)

    })
    
})