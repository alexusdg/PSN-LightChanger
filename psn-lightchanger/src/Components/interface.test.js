import { cleanup, screen, render } from "@testing-library/react"
import { Title, Welcome, Header, GetStartedButton } from "./interface.js"

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
    render(<GetStartedButton/>)
    const elem = document.getElementById("get_started")

    test("Get Started Button Rendering", () => {expect(elem.textContent).toBe("Get Started")})
})


