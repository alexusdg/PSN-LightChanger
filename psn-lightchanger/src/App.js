import { LifxVerify, PSNVerify } from "./Pages/verify"
import LifxList from "./Pages/list"
import { Routes, Route, HashRouter } from "react-router-dom"
import SetupComplete from "./Pages/complete"
import Home from "./Pages/home"
import "../src/Style/style.css"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psn_verify/" element={<PSNVerify />} />
        <Route path="/lights_verify/" element={<LifxVerify />} />
        <Route path="/lights_list/" element={<LifxList />} />
        <Route path="/complete/" element={<SetupComplete />} />
      </Routes>
    </HashRouter>
  )
}

export default App
