// import { Link } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { loginSts } from "../../atom";
import { useNavigate } from "react-router-dom";
import { cartItems } from "../../atom";
import { logOut } from "../utilities/users-service";




import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function NavBar() {
  const userDetails = useAtomValue(loginSts);

  const goTo = useNavigate();

  const [user, setUser] = useAtom(loginSts);
  const [cartState,setCartState] = useAtom(cartItems);
  console.log(cartState)

  const itemsinside = useAtomValue(cartItems);
  console.log(itemsinside);

  console.log(userDetails, user);

  const handleClick = () => {
    // console.log(userDetails._id);
    console.log("test")
    goTo(`/user/cart`);
  };



  // const Authentication = () => {
  //   if (userDetails) {
  //     return (
  //       <div>
  //         <div onClick={handleClick}>Welcome : {userDetails.username}</div>
  //       </div>
  //     );
  //   } else {
  //     return <Link to="/auth">Login</Link>;
  //   }
  // };


  const handleLogOut = () => {
		goTo("/")
		logOut();
		setCartState("")
		setUser(null);
	};



const navigation = [
  { name: '3D Printed World', href: '/', current: true, number: false },
  { name: 'Home', href: '/', current: false, number: false },
  { name: 'Product', href: '/products', current: false, number: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CircleIconWithNumber = ({ number }) => {
  if(user === null)
  {
    return ""
  }
  return (
    <div className="">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
        <span className="text-white font-bold">{number}</span>
      </div>
      {/* <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white rounded-tl-none"></div> */}
    </div>
  );
};

  return (
    // <ul
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     //   fontSize: "25px",
    //     //   backgroundColor: "grey",
    //   }}
    //   className="-mb-px flex space-x-8 px-4"
    //   aria-orientation="horizontal"
    //   role="tablist"
    // >
    //   <Link to="/">3D Printed World</Link>
    //   <Link to="/">Home</Link>
    //   <Link to="/products">Product</Link>
    //   <Link to="/user/cart">Cart: {itemsinside.totalQty}</Link>

    //   {/* <Link to="/auth">Login</Link> */}
    //   <Authentication />
    // </ul>

    


    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/images.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-large'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                        
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              
                <button
                  type="button"
                  onClick={handleClick}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
        
                  <span className="sr-only">View notifications</span>
        
                   <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
        
                    <span style={{fontSize:"14px",marginRight:"10px"}} >Cart</span>
                    <CircleIconWithNumber number={itemsinside.totalQty} />
                   </div>

                  
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVNl0TVPEwDDpv0A4h2ukPqW9haj9FvzxrQ&s"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  {userDetails !== null ?
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userDetails.usertype === "admin" && <Menu.Item>
                          {({ active }) => (
                            <a
                            href= "/admin"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Admin
                            </a>
                          )}
                        </Menu.Item>}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href= "/user"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleLogOut}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                : <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href= "/auth"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Login / Sign Up
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
