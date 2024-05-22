import debug from "debug";
import { Component } from "react";
import { signUp } from "../../utilities/users-service";

const log = debug("mern:components:SignUpForm");


export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    username: "",
    password: "",
    usertype: "",
    confirm: "",
    error: ""
  };


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { ...this.state };
    delete formData.error;
    delete formData.confirm;

    try {
      const user = await signUp(formData);
      log("user: %o", user);
      this.props.setUser(user);
      //! to decide where to navigate
    } catch (error) {
      this.setState({ error: "Sign Up Failed" });
    }
  };

  render() {
    return (
      <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-16 w-auto"
          src="/images.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up a new account
        </h2>
      </div>
  
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={this.handleSubmit}>
        <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-gray-900">
            Password Confirmation
            </label>
            <div className="mt-2">
              <input
                id="confirm"
                name="confirm"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={this.state.confirm}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="usertype" className="block text-sm font-medium leading-6 text-gray-900">
            User Type
            </label>
            <div className="mt-2">
              <input
                id="usertype"
                name="usertype"
                placeholder=" Input token for admin"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={this.state.usertype}
                onChange={this.handleChange}
              />
            </div>
          </div>


          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                // autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
  
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Address
              </label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="address"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>
          </div>
        </form>
  
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={()=> this.props.setLoginState("login")}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  </>
    
      );
  }
}
