import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Response_Msg } from "../../constants/response";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const nav = useNavigate();
  const [formData, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState({});

  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
        ...prev, [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError({});

    try {
        const res = await axios.post('http://localhost:3000/api/register', formData);
        toast.success(res.data.message);
        setTimeout(()=> nav('/dashboard'), 1500);
    }
    catch (err) {
        if (err.response.status == 400) {
          const newErrors = {};
          const details = err.response.data.message.details;
          details.forEach(detail => {
            const field = detail.path[0];
            const message = detail.message;
            newErrors[field] = message;
          });
          setError(newErrors);
        }
        else if (err.response.status == 409) {
          setFlag(true);
        }
        else {
          toast.error(Response_Msg.Error);
          setForm({ name: '', email: '', password: '' });
          console.log(err.response);
        }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign up for free</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {flag &&  <p className="text-red-500 mb-4 text-[16px]"> User with this email already exists</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                  Username
                </label>
                <div className="mt-2">
                  <input type="text" 
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    name="name" placeholder="Username" onChange={handleChange} value={formData.name} required />
                    {error.name && <p className="mt-2 text-red-500 text-sm">{Response_Msg.nameErr}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                  Email address
                </label>
                <div className="mt-2">
                  <input 
                    type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                  {error.email && <p className="mt-2 text-red-500 text-sm">{Response_Msg.emailErr}</p>}
                </div>
              </div>

              <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                    Password
                  </label>
                <div className="mt-2">
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required 
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                  {error.password && <p className="mt-2 text-red-500 text-sm">{Response_Msg.passErr}</p>}
                </div>
              </div>

              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Sign up
              </button>
              {flag && <p className="text-sm mt-2 mx-2 text-gray-200">Already have an account?{' '}
                <Link to='/login' className="text-indigo-400 hover:underline">Login here</Link>
                </p>}          
            </form>
        </div>
      </div>

    </>
  );
};

export default Register;
