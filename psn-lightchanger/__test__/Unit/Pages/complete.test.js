import { cleanup, render } from "@testing-library/react"
import SetupComplete from "../../../src/Pages/complete"
import { RENDERS_TEST } from "../../../constants"

afterAll(cleanup)

describe("Setup Complete Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<SetupComplete/>)
    })
})
