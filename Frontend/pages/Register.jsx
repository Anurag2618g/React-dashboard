import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const nav = useNavigate();
  const [formData, setForm] = useState({
    name: '',
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
        const res = await axios.post('http://localhost:3000/api/register', formData);
        if (res.status == 200) {
            alert(res.data.message);
            nav('/dashboard');
        } 
        else if (res.status == 500) {
            alert(res.data.message);
        }
    }
    catch (err) {
        console.log(err);
    }
  };

  return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    </>
  );
};

export default Register;
