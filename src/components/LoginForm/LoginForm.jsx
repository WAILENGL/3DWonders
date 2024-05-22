import debug from "debug";
// import { useNavigate } from "react-router-dom";
import { login } from "../../utilities/users-service";
import { useState } from "react";
const log = debug("mern:components:LoginForm");

export default function LoginForm({ setUser,setLoginState }) {
  // const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    log("data: %o", data);
    const { email, password } = data;
    const user = await login(email, password);
    setUser(user);
  };

  const handleAlert =() =>
  {
    setIsOpen(true)
  }

  const handlelosePopUp = () =>
  {
    setIsOpen(false)
  }

  const MyPopup = () =>
  {
    return(
    <div id='ModelContainer'
      onClick={handlelosePopUp}
      className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'>
      <div 
        className='p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5'>
        <div
          className='w-full p-3 justify-center items-center'>
          <h2
            className='font-semibold py-3 text-center text-xl'>
              Sorry we also forget your password
          </h2>
        </div>
      </div>
    </div>)
  }

  return (
    // <><form onSubmit={handleSubmit}>
    //   <fieldset>
    //     <legend>Login</legend>

    //     <label>
    //       Email:
    //       <input name="email" />
    //     </label>
    //     <br />

    //     <label>
    //       Password:
    //       <input name="password" />
    //     </label>
    //     <br />
    //     <button>Login</button>
    //   </fieldset>
    // {/* eslint-disable-next-line react/no-unescaped-entities */}
    // </form>Or don't have an account<button onClick={()=> setLoginState("signup")}>Signup</button></>


    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-16 w-auto"
        src="/images.png"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              // type="email"
              // autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={handleAlert}>
                Forgot password?
              </a>
              {isOpen && <MyPopup />}
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={()=> setLoginState("signup")}>
          Sign Up Now
        </a>
      </p>
    </div>
  </div>
</>
  );
}
