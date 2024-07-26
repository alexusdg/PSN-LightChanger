import './App.css';
import LifxLights from './Pages/lights'
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lights" element={<LifxLights/>} />
      </Routes>
    </BrowserRouter>
);
}

export default App;
