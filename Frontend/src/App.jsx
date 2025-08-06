import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import './index.css'
import Footer from '../components/Footer';
import Dashboard from '../pages/Dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/dashboard" element = {<Dashboard />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App;