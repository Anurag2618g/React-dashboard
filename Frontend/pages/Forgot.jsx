import { useState } from "react";
import axios from 'axios';
import { Response_Msg } from "../../constants/response";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [flag, setFlag] = useState(false);
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setFlag(false)

    try {
        const res = await axios.post('http://localhost:3000/api/forgot', {email});
        toast.success(res.data.message);
        setEmail('');
    }
    catch (err) {
        if (err.response.status == 400) {
          const details = err.response.data.message.details[0];
          setError(details.message);
        }
        else if (err.response.status == 404) {
          setFlag(true);
        }
        else {
          toast.error(Response_Msg.Error);
          setEmail('');
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Forgot Password</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {flag &&  <p className="text-red-500 mb-4 text-sm text-center"> User with this email doesn't exists</p>} 
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400">
                  Enter your email and we'll send you a reset password link.
                </label>
                <div className="mt-2">
                  <input 
                    type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                  {error && <p className="mt-2 text-red-500 text-sm">{Response_Msg.emailErr}</p>}
                </div>
              </div>

              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Submit
              </button>
                <Link to='/login' className="text-sm mt-2 mx-2 text-indigo-400 hover:underline"> &lt; Back to login</Link>
            </form>
        </div>
      </div>

    </>
  );
};

export default Forgot;
