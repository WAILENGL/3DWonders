import {useAtomValue} from "jotai"
import { loginSts } from "../../../../atom";

import { useState } from "react";

import AdminCreateProduct from "../../AdminCreateProduct/AdminCreateProduct";
import AdminViewOrder from "../../../components/AdminViewOrder/AdminViewOrder";
import AdminDeleteProduct from "../../../components/AdminDeleteProduct/AdminDeleteProduct";


import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ClockIcon} from '@heroicons/react/20/solid'
import {
  CursorArrowRaysIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const solutions = [
  { name: 'Create Product', description: 'Tool for creating customized products.', href: '#', icon: SquaresPlusIcon },
  { name: 'View Customer Order', description: `Display of customer's order details`, href: '#', icon: CursorArrowRaysIcon },
  { name: 'Delete Prodcut', description: "Removing product from database", href: '#', icon: ClockIcon }]

export default function AdminPage()
{
    const userDetails = useAtomValue(loginSts);
    const { usertype } = userDetails;

    const [pageState, setPageState] = useState("")

    const handleClick = (event) =>
    {
      const eventHandler = event.target.getAttribute("name")
      if(eventHandler === "Create Product")
      {
        setPageState(<AdminCreateProduct/>)
      }
      else if (eventHandler === "View Customer Order"){
        setPageState(<AdminViewOrder/>)
      }
      else if (eventHandler === "Delete Prodcut"){
        setPageState(<AdminDeleteProduct/>)
      }
      
    }

    // console.log(userDetails,usertype)

    const AdminPage = () =>
    {
      if(usertype !== "admin")
      {
          return(<h1>Sorry you have no access to this page!</h1>)
      }
      else{
          return <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>Welcome Admin, What would you like to do ?</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div >
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name} 
                      <span className="absolute inset-0" onClick={handleClick} name={item.name}/>
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>

      }
    }
    

    return(<>
    <AdminPage/><div style={{margin:"50px"}}>{pageState}</div>
    
    </>)
}