import { useParams } from "react-router-dom"

import { produce } from "immer";
import {useAtom,useAtomValue} from "jotai"
import { adminUserOrder } from "../../../atom";

import {updateOrder} from "../../utilities/order-service"

export default function AdminViewOrderDetails()
{
    const {orderid} = useParams();

    const currentOrder = useAtomValue(adminUserOrder);
    const [currentViewOrder,setCurrentViewOrder] = useAtom(adminUserOrder);

    const finder = currentOrder.findIndex(item => item._id === orderid)
    console.log(finder)
    const handleChange = (e) =>
    {
        const nextState = produce(currentOrder, (draft) => {
            draft[finder].orderStatus = e.target.value;
            updateOrder(draft[finder],orderid)
          });
        setCurrentViewOrder(nextState);
    }

    const orderDetails = currentOrder && currentOrder[finder]?.orderLine?.map((item,idx) => 
        {
        return(<div key={idx}>
        <ul role="list" className="divide-y divide-blue-200 hover:divide-pink-400">
          <p></p>
        <li  className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.product_id.picture} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900" value={item.product_id._id}>Order Id: {item.product_id._id}</p>
              <p className="mt-1 truncate text-xs leading-7 text-gray-500">Name: {item.product_id.title}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">Price: {item.product_id.price}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">Quantity: {item.orderQty}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{currentOrder[finder].orderStatus}</p>
            {item !== "Delivered"? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Order Status {currentOrder.orderStatus}
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Delivered Successfully</p>
              </div>
            )}
          </div>
        </li >
        <p></p>
    </ul></div>)
        })

    return (<div >
        <div>Order Status {currentOrder.orderStatus}</div>
        <label htmlFor="orderoption" style={{display:"flex",flexDirection:"column"}} >Choose a order status:</label>
        <select name="orderoption" id="orderoption" onChange={handleChange}>
            <option value="Shipped">Shipped</option>
            <option value="Shipping">Shipping</option>
            <option value="Delivered">Delivered</option>
        </select>
        {orderDetails}
        </div>)}

