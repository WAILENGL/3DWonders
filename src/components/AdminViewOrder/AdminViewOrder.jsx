import { getAllOrders } from "../../utilities/order-service";
import { useState,useEffect } from "react";

import { adminUserOrder } from "../../../atom";

import {useAtom} from "jotai"

import { useNavigate } from "react-router-dom";

export default function AdminViewOrder()
{
    const [orders, setOrders] = useState("")
    const navigate = useNavigate();
    const [currentViewOrder,setCurrentViewOrder] = useAtom(adminUserOrder);
    console.log(currentViewOrder)
    console.log(orders)
    useEffect(() => {
		const getDetails = async() => 
        {
            setOrders(await getAllOrders())
        }
        getDetails()
	}, []);
  // console.log(orders)
    const handleClick = (event) =>
    {
      const idValue = (event.target.getAttribute('value'))
      // console.log(event.target)
      // console.log(idValue)
      setCurrentViewOrder(orders)
      navigate(`/admin/vieworder/${idValue}`)
    }
    console.log(orders)
    
    const orderDetails = orders && orders?.map((item,idx) => 
        {
            // return(<tr key={idx} style={{ textAlign: "center" }}>
            //         <td onClick={handleClick}>{item._id}</td>
            //         <td>{item.orderStatus}</td>
            //         <td>$ {item.orderTotal.toFixed(2)}</td>
            //         <td>{item.totalQty}</td>
            //         <td>{JSON.stringify(item.paidStatus)}</td>
            //     </tr>)
            return(
        <ul role="list" className="divide-y divide-gray-100" key={idx}>
          <p></p>
        <li  className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5IKM8Na-LygFdA0PWsGZ4EgBtn00bhhp60zBTgXIr1g&s" alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900" onClick={handleClick} value={item._id}>Order Id: {item._id}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500" value={item?.user_id?._id}>User: {item.user_id?.name}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Items in Cart: {item.totalQty}</p>
            {item.orderStatus !== "Delivered"? (
              <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
              </div>
              <p className="text-xs leading-5 text-gray-500">
                {item.orderStatus}
              </p>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Delivered Successfully</p>
              </div>
            )}
          </div>
        </li>
    </ul>)
        })
  
    return(<div >
        <p>Total Orders: {orders.length}</p>
          {orderDetails}
        </div>)
}



