import { cleanup, render } from "@testing-library/react"
import SetupComplete from "../../../src/Pages/complete"

const RENDERS_TEST = "Renders"

afterAll(cleanup)

describe("SetupComplete Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<SetupComplete/>)
    })
})
