import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import { useAtom } from 'jotai';
import { loginSts, cartItems } from '../../../atom';
import { getCartDetails } from '../../utilities/cart-service';

export default function CheckOutPage() {
	const [customerDetails, setCustomerDetails] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);
	const goToResults = useNavigate();
	const [user] = useAtom(loginSts);
	const [cartState,setCartState] = useAtom(cartItems);
	const orderid = cartState._id;
	
	useEffect(() => {
		setCustomerDetails(user);
	}, [user]);

	/* 	useEffect(() => {
		setOrderDetails(currentcartItems);
	}, [currentcartItems]);  */

	useEffect(() => {
		async function getDetails() {
		  let results = await getCartDetails();
		  setCartState(results);
		}
		// console.log("here before")
		getDetails();
	  }, [setCartState]);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			try {
				const data = await sendRequest(`/api/orders/getUserOrders/`, 'GET');
				setOrderDetails(data);
			} catch (error) {
				console.error('Error fetching order details:', error);
			}
		};
		fetchOrderDetails();
	}, [user]);
	console.log(orderDetails)
	async function handlePlaceOrderClick() {
		try {
			if (!user) {
				goToResults('/login');
				return;
			}
			await sendRequest(`/api/orders/${orderid}/paid`, 'PATCH');
			goToResults(`/user/thankyou`, {
				state: {
					orderDetails: orderDetails,
					customerDetails: customerDetails,
				},
			});
		} catch (error) {
			console.error('Error updating order details:', error);
		}
	}

	return (
		<>
			<div className="">
				<h2>Your Shipping Details</h2>
				{customerDetails && (
					<table>
						<tbody>
							<tr>
								<td>Name:</td>
								<td>{customerDetails.name}</td>
							</tr>
							<tr>
								<td>Email:</td>
								<td>{customerDetails.email}</td>
							</tr>
							<tr>
								<td>Address:</td>
								<td>{customerDetails.address}</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>

			<div>
				<br></br>
				<h2>Cart Summary</h2>

				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{orderDetails &&
							orderDetails.orderLine?.map((item, index) => (
								<tr key={index}>
									<td>{item.product_id.title}</td>
									<td>{item.orderQty}</td>
									<td>${item.extPrice}</td>
								</tr>
							))}
					</tbody>
				</table>
				<p>Cart Total: {orderDetails && orderDetails.orderTotal}</p>
			</div>

			<div>
				<button onClick={handlePlaceOrderClick}>Place Order</button>
			</div>
		</>
	);
}
