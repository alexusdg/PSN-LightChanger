import './App.css';
import LifxLights from './Pages/lights'
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lifx_verify" element={<LifxLights/>} />
        <Route path="/lights" element={<>test</>} />
      </Routes>
    </BrowserRouter>
);
}

export default App;
