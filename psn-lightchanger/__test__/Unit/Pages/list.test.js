
import { cleanup, fireEvent, render } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import LifxList from "../../../src/Pages/list"
import React from "react"
import { CORRECT_FUNCITON_CALLED_ONCLICK_TEST, RENDERS_TEST } from "../../../constants"

const setState = jest.fn()

beforeEach(() => {
    setState.mockReset()
})

afterAll(cleanup)

describe("List Component", () => {
    const router = createMemoryRouter([{path: '/',element:<LifxList page='/test'/>}])
    test(`${RENDERS_TEST}`, async () => {
        render(<RouterProvider router={router}/>)
    })

    test(`${CORRECT_FUNCITON_CALLED_ONCLICK_TEST}`, async () => {
        render(<RouterProvider router={router}/>)
        const spy = jest.spyOn(React, 'useState').mockImplementationOnce(initState => [initState, setState])

        var done_button_elem = document.querySelector(".done_button")
        fireEvent.click(done_button_elem)
        
        expect(spy).toHaveBeenCalled()
    })
})