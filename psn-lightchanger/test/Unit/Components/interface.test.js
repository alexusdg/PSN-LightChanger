import { cleanup, fireEvent, render } from "@testing-library/react"
import { Title, Welcome, Header, GetStartedButton, SubHeader, LoginInstruction, DoneButton, ListLights, CircleStep } from "../../../src/Components/interface.js"
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom"

const RENDERS_TEST = "Renders"
const CORRECT_TEXT_TEST = "Renders with Correct Text"
const NAVIGATE_TEXT_TEST = "Navigates to The Correct Route"
const CORRECT_FUNCITON_CALLED = "Onclick Triggers Correct Function"

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
  }))

beforeEach(() => {
    mockedNavigate.mockReset()
})

afterEach(cleanup)

describe("Title Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<Title/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<Title/>)
        const elem = document.getElementById("title")

        expect(elem.textContent).toBe("PSN Light Changer")
    }) 
})

describe("Welcome Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<Welcome/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<Welcome/>)
        const elem = document.getElementById("welcome")
        
        expect(elem.textContent).toBe("Welcome")

    })
})

describe("Header Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<Header/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<Header/>)
        const elem = document.querySelector(".header")

        expect(elem.textContent).toBe("PSN Light Changer")
    })
    
})

describe("Get Started Button Component", () => {
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
        const elem = document.getElementById("get_started")
    
        fireEvent.click(elem)

        expect(mockedNavigate).toHaveBeenCalledTimes(1)    
        expect(mockedNavigate).toHaveBeenCalledWith('/test')

    })
})

describe("Sub Header Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<SubHeader/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<SubHeader title={"Fake Header"}/>)
        const elem = document.getElementById("sub_header")

        expect(elem.textContent).toBe("Fake Header")
    })
})

describe("Login Instruction Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<LoginInstruction/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<LoginInstruction account={"Fake Name"} link={"https://notareallink.com"}/>)
        const elem = document.querySelector(".sub_instruction")

        expect(elem.textContent).toBe("Login to Fake Name : https://notareallink.com")
    }) 
})

describe("Done Button Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<DoneButton/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<DoneButton/>)
        const elem = document.querySelector(".done_button")

        expect(elem.textContent).toBe("Done") 
    })
})

describe("Circle Step Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<CircleStep/>)
    })

    test(`${CORRECT_TEXT_TEST}`, () => {
        render(<CircleStep number={"nan"} />)
        const elem = document.querySelector(".circle_step")

        expect(elem.textContent).toBe("nan")
    })
})

describe("List Lights Component", () => {
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
        
        fireEvent.click(elem)
        expect(elem.classList).toContain("lights_label_chosen")

        fireEvent.click(elem)
        expect(elem.classList).not.toContain("lights_label_chosen")


    })
    
})