import { cleanup, render } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import Home from "../../../src/Pages/home"
import { RENDERS_TEST } from "../../../constants"

afterAll(cleanup)

describe("Home Component", () => {
    const router = createMemoryRouter([{path: '/',element:<Home/>}])
    
    test(`${RENDERS_TEST}`, () => {
        render(<RouterProvider router={router}/>)
    })
})