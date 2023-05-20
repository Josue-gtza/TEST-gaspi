import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage.js';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Providers from '../src/components/providers';
function App() {
  return (
    <div className="App">
 <Router>
  <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route path="/Providers" element={<Providers />} />
  </Routes>
</Router>
      
    </div>
  );
}

export default App;
