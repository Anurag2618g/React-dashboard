import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Response_Msg } from "../../constants/response";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {

  const nav = useNavigate();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({});
  const { token } = useParams();

  const handleChange = async(e) => {
    setForm(prev => ({
      ...prev, [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError({});

    try {
        if (form.password !== form.confirmPassword) {
          setError({confirmPassword: 'Passwords do not match'});
          return;
        }
        const res = await axios.post(`http://localhost:3000/api/reset/${token}`, form);
        toast.success(res.data.message);
        nav('/login');
    }
    catch (err) {
        if (err.response.status == 400) {
          const newErrors = {};
          const details = err.response.data.message.details;
          details.forEach(element => {
            const field = element.path[0];
            const message = element.message;
            newErrors[field] = message;
          });
          setError(newErrors);
        }
        else {
          toast.error(Response_Msg.Error);
          setForm({password: '', confirmPassword: ''});
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Change Password</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error.confirmPassword && <p className="mt-2 mx-2 text-red-500 text-center">{error.confirmPassword}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                    New Password
                  </label>
                <div className="mt-2">
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} value={form.password} required 
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                  {error.password && <p className="mt-2 text-red-500 text-sm">{Response_Msg.passErr}</p>}
                </div>
              </div>
              <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                    Confirm New Password
                  </label>
                <div className="mt-2">
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={form.confirmPassword} required 
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                  {error.confirmPassword && <p className="mt-2 text-red-500 text-sm">{Response_Msg.passErr}</p>}
                </div>
              </div>

              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Submit
              </button>
                <Link to='/forgot' className="text-sm mt-2 mx-2 text-indigo-400 hover:underline"> &lt; Back</Link>
            </form>
        </div>
      </div>

    </>
  );
};

export default ResetPassword;
