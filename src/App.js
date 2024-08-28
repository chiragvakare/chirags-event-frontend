import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Card } from './components/Card';

function App() {
  return (<>
    <Navbar />
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/events" element={<Card myEvent="true"/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
