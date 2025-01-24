import { cleanup, render } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import Home from "../../../src/Pages/home"

const RENDERS_TEST = "Renders"

afterAll(cleanup)

describe("Home Component", () => {
    const router = createMemoryRouter([{path: '/',element:<Home/>}])
    
    test(`${RENDERS_TEST}`, () => {
        render(<RouterProvider router={router}/>)
    })
})