import LifxVerify from './Pages/verify'
import LifxList from './Pages/list'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import SetupComplete from './Pages/complete';



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LifxVerify/>} />
        <Route path="/lights_verify" element={<LifxVerify/>} />
        <Route path="/lights_list" element={<LifxList/>} />
        <Route path='/complete' element={<SetupComplete/>}/>
      </Routes>
    </HashRouter>
);
}

export default App;
