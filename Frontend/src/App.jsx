import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import './index.css'
import Footer from '../components/Footer';
import Dashboard from '../pages/Dashboard';
import Example from '../pages/Example';

function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/dashboard" element = {<Dashboard />} />
        <Route path = "/example" element = {<Example />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App;