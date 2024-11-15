import { cleanup, screen, render } from "@testing-library/react"
import { Title, Welcome, Header, GetStartedButton, SubHeader, LoginInstruction, DoneButton, ListLights } from "../../src/Components/interface.js"
import { createMemoryRouter, RouterProvider } from "react-router-dom"

afterEach(cleanup)

describe("Title Renders", () => {
    render(<Title/>)
    const elem = document.getElementById("title")

    test("Title Rendering", () => {expect(elem.textContent).toBe("PSN Light Changer")})
})

describe("Welcome Renders", () => {
    render(<Welcome/>)
    const elem = document.getElementById("welcome")

    test("Welcome Rendering", () => {expect(elem.textContent).toBe("Welcome")})
})

describe("Header Renders", () => {
    render(<Header/>)
    const elem = document.querySelector(".header")

    test("Header Rendering", () => {expect(elem.textContent).toBe("PSN Light Changer")})
})

describe("Get Started Button Renders", () => {
    const router = createMemoryRouter([{path: '*',element:<GetStartedButton/>}])
    render(<RouterProvider router={router} />)
    const elem = document.getElementById("get_started")

    test("Get Started Button Rendering", () => {expect(elem.textContent).toBe("Get Started")})
})

describe("Sub Header Renders", () => {
    render(<SubHeader title={"Fake Header"}/>)
    const elem = document.getElementById("sub_header")

    test("Sub Header Rendering", () => {expect(elem.textContent).toBe("Fake Header")})
})

describe("Login Instruction Renders", () => {
    render(<LoginInstruction account={"Fake Name"} link={"https://notareallink.com"}/>)
    const elem = document.querySelector(".sub_instruction")

    test("Sub Header Rendering", () => {expect(elem.textContent).toBe("Login to Fake Name : https://notareallink.com")})
})

describe("Done Button Renders", () => {
    render(<DoneButton/>)
    const elem = document.querySelector(".done_button")

    test("Done Button Rendering", () => {expect(elem.textContent).toBe("Done")})
})

describe("List Lights Renders", () => {
    render(<ListLights light_name={"Fake Light Name"}/>)
    const elem = document.querySelector(".lights_label")

    test("List Lights Rendering", () => {expect(elem.textContent).toBe("Fake Light Name")})
})








