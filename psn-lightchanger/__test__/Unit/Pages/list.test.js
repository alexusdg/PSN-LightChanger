
import { cleanup, fireEvent, render } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import LifxList from "../../../src/Pages/list"
import React from "react"

const setState = jest.fn()

beforeEach(() => {
    setState.mockReset()
})

afterAll(cleanup)

describe("Render", () => {
    const router = createMemoryRouter([{path: '/',element:<LifxList page='/test'/>}])
    test('tst', async () => {
        render(<RouterProvider router={router}/>)
    })

    test('', async () => {
        render(<RouterProvider router={router}/>)
        const spy = jest.spyOn(React, 'useState').mockImplementationOnce(initState => [initState, setState])

        var done_button_elem = document.querySelector(".done_button")
        fireEvent.click(done_button_elem)
        
        expect(spy).toHaveBeenCalled()
    })
})