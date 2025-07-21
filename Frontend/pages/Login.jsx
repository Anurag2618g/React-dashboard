import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const nav = useNavigate();
  const [formData, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
        ...prev, [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.get('http://localhost:3000/api/login', formData);
        if (res.status == 200) {
            alert(res.message);
            nav('/dashboard');
        } 
        else if (res.status == 500) {
            alert(res.message);
        }
    }
    catch (err) {
        console.log(err);
    }
  };

  return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    </>
  );
};

export default Login;
