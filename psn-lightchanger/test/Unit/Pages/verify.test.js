import { cleanup, render } from "@testing-library/react"
import { PSNVerify, LifxVerify } from "../../../src/Pages/verify"

const RENDERS_TEST = "Renders"

afterEach(cleanup)

describe("PSNVerify Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<PSNVerify/>)
    })
})

describe("LIFXVerify Component", () => {
    test(`${RENDERS_TEST}`, () => {
        render(<LifxVerify/>)
    })
})