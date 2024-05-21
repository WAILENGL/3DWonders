import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { loginSts } from '../../../atom';
import { logOut } from '../../utilities/users-service';
import sendRequest from '../../utilities/send-request';
import { useNavigate } from 'react-router-dom';
import { cartItems } from '../../../atom';

export default function UserProfile() {
	const [userOrders, setUserOrders] = useState(null);
	const [clickedOrder, setClickedOrder] = useState(null);
	const [user, setUser] = useAtom(loginSts);
	const [cartState,setCartState] = useAtom(cartItems);
	/* const [userOrderDetails , setUserOrderDetails] = useState(null);
	 */
	//fetch orders under userId

	console.log(cartState)
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrderIds = async () => {
			try {
				const data = await sendRequest(`/api/user/orders`)
				setUserOrders(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOrderIds();
	}, [user]);


	const handleLogOut = () => {
		navigate("/")
		logOut();
		setCartState("")
		setUser(null);
	};

console.log(user)

const handleOrderClick = async (order) => {
		try {
			// console.log('orderid', order);
			const response = await fetch(`/api/orders/order/${order}`);
			const data = await response.json();
			setClickedOrder(data[data.findIndex(x=>x._id === order)]);
			// console.log('orderdata', clickedOrder);
		} catch (error) {
			console.error(error);
		}
	}; 


	return (
		<>
			<div>
				<h4>Order History</h4>
				{userOrders &&
					userOrders.map((order) => (
						<div key={order}>
							<button onClick={() => handleOrderClick(order)}>
								Order {order}
							</button>
						</div>
					))}
			</div>
			<br></br>
			<div>
				<h4>Order Details</h4>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{clickedOrder &&
							clickedOrder.orderLine?.map((lineItem) => (
								<tr key={lineItem._id}>
									<td>{lineItem.product_id.title}</td>
									<td>{lineItem.orderQty}</td>
									<td>${lineItem.extPrice}</td>
								</tr>
							))}
					</tbody>
				</table>
				<p>Order Total: ${clickedOrder && clickedOrder.orderTotal}</p>
			</div>
			<br></br>
			<button onClick={handleLogOut}>Log Out</button>
		</>
	);
}
