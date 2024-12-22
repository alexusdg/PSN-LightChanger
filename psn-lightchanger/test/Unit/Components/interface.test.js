import { cleanup, render } from "@testing-library/react"
import { Title, Welcome, Header, GetStartedButton, SubHeader, LoginInstruction, DoneButton, ListLights, CircleStep } from "../../../src/Components/interface.js"
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom"
import { Simulate } from "react-dom/test-utils"
import { LightChosen } from "../../../src/Functions/list_functions.js"

const RENDERS_TEST = "Renders"
const CORRECT_TEXT_TEST = "Renders with Correct Text"
const NAVIGATE_TEXT_TEST = "Navigates to The Correct Route"
const CORRECT_FUNCITON_CALLED = "Onclick Triggers Correct Function"

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }))

jest.mock('../../../src/Functions/list_functions.js', () => ({
    ...jest.requireActual('../../../src/Functions/list_functions.js'),
    LightChosen: jest.fn(),
}))

beforeEach(() => {
    mockedUsedNavigate.mockReset();
})

afterEach(cleanup)

describe("Title Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<Title/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<Title/>)
        const elem = document.getElementById("title")

        expect(elem.textContent).toBe("PSN Light Changer")
    }) 
})

describe("Welcome Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<Welcome/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<Welcome/>)
        const elem = document.getElementById("welcome")
        
        expect(elem.textContent).toBe("Welcome")

    })
})

describe("Header Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<Header/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<Header/>)
        const elem = document.querySelector(".header")

        expect(elem.textContent).toBe("PSN Light Changer")
    })
    
})

describe("Get Started Button Renders", () => {
    const router = createMemoryRouter([{path: '/',element:<GetStartedButton page='/test'/>}])
    test(`${RENDERS_TEST}`, () => {
        
        render(<RouterProvider router={router}/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<RouterProvider router={router} />)
        const elem = document.getElementById("get_started")

        expect(elem.textContent).toBe("Get Started")
    })

    test(`${NAVIGATE_TEXT_TEST}`, () => {
        render(<RouterProvider router={router} />)
    
        useNavigate.mockReturnValue(mockedUsedNavigate);
        const elem = document.getElementById("get_started")
        elem.click()
        
        expect(useNavigate).toHaveBeenCalledTimes(1)    
        expect(useNavigate).toHaveBeenCalledWith('/test')

    })
    
})

describe("Sub Header Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<SubHeader/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {

        render(<SubHeader title={"Fake Header"}/>)
        const elem = document.getElementById("sub_header")

        expect(elem.textContent).toBe("Fake Header")
    })
})

describe("Login Instruction Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<LoginInstruction/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<LoginInstruction account={"Fake Name"} link={"https://notareallink.com"}/>)
        const elem = document.querySelector(".sub_instruction")

        expect(elem.textContent).toBe("Login to Fake Name : https://notareallink.com")
    }) 
})

describe("Done Button Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<DoneButton/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<DoneButton/>)
        const elem = document.querySelector(".done_button")

        expect(elem.textContent).toBe("Done") 
    })
})

describe("Circle Step Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<CircleStep/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<CircleStep number={"nan"} />)
        const elem = document.querySelector(".circle_step")

        expect(elem.textContent).toBe("nan")
    })
})

describe("List Lights Renders", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<ListLights/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<ListLights light_name={"Fake Light Name"}/>)
        const elem = document.querySelector(".lights_label")

        expect(elem.textContent).toBe("Fake Light Name")
    })

    test(`${CORRECT_FUNCITON_CALLED}`, () => {
        render(<ListLights light_name={"Fake Light Name"}/>)
        const elem = document.querySelector(".lights_label")
        elem.click()

        expect(LightChosen).toHaveBeenCalledTimes(1)
    })
})