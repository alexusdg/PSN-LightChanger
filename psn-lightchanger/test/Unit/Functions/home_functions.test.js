import { cleanup, render } from "@testing-library/react"
import { DirectToVerify } from "../../../src/Functions/home_functions"
import { useNavigate } from "react-router-dom"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }))

afterEach(cleanup)

describe("Test Navigation to Expected Page", ()=> {

    test("test", () => {
        render(<DirectToVerify/>)
        expect(useNavigate).toHaveBeenCalledTimes(1)

    })
    
})