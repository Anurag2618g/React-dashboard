import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Response_Msg } from "../../constants/response";
import { toast } from "react-toastify";

const Login = () => {
  const nav = useNavigate();
  const [formData, setForm] = useState({
    email: '',
    password: '',
  });
  const [error , setError] = useState({});
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
        ...prev, [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError({});
    setMessage('');

    try {
        const res = await axios.post('http://localhost:3000/api/login', formData);
        setMessage(res.data.message);
        toast.success(Response_Msg.LoggedIn);
        setTimeout(() => nav('/dashboard'), 1500);
    }
    catch (err) {
        if (err.response.status == 400) {
          const newError = {};
          const details = err.response.data.message.details;
          details.forEach(detail => {
            const field = detail.path[0];
            const message = detail.message;
            newError[field] = message;
          });
          setError(newError);
        }
        else if (err.response.status == 401) {
          setFlag(true);
        }
        else {
          toast.error(Response_Msg.Error);
          setForm({email: '', password: ''});
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {flag && <p className="text-red-500 text-base mb-2 text-center">{Response_Msg.Incorrect}</p>}
        {message && <p className="text-green-500 text-base mb-2 text-center">{message}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                  Email address
                </label>
                <div className="mt-2">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  {error.email && <p className="mt-2 text-red-500 text-sm">{Response_Msg.emailErr}</p>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                    Password
                  </label>
                  <div className="text-sm">
                  <Link to="/forgot" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} 
                    required 
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  {error.password && <p className="mt-2 text-red-500 text-sm">{Response_Msg.passErr}</p>}
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Sign in
                </button>
                {flag && 
                  <p className="mt-2 mx-2 text-sm text-gray-200">Don't have a account?{' '}
                  <Link to='/register' className="text-indigo-400 hover:underline">Sign up here</Link>
                  </p> 
                }
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default Login;
