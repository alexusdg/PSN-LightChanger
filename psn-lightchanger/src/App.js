import './App.css';
import LifxVerify from './Pages/verify'
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lifx_verify" element={<LifxVerify/>} />
        <Route path="/lights" element={<></>} />
      </Routes>
    </BrowserRouter>
);
}

export default App;
