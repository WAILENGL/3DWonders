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
	const [cartState, setCartState] = useAtom(cartItems);
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
	console.log(orderDetails);
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
			<div className="max-w-xl mx-auto w-full p-6 rounded-lg shadow-md text-center">
				<h2 className="text-xl font-semibold mb-4 text-center">Your Shipping Details</h2>
				{customerDetails && (
					<table className="table-auto mx-auto">
						<tbody>
							<tr>
								<td className="font-semibold text-left px-4">Name:</td>
								<td className="text-left">{customerDetails.name}</td>
							</tr>
							<tr>
								<td className="font-semibold text-left px-4">Email:</td>
								<td className="text-left">{customerDetails.email}</td>
							</tr>
							<tr>
								<td className="font-semibold text-left px-4">Address:</td>
								<td className="text-left">{customerDetails.address}</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>
			<hr className="border-black" />

			<div className="max-w-xl mx-auto p-6 mt-12 rounded-lg shadow-md">
				<h2 className="text-xl font-semibold text-center mb-4">Cart Summary</h2>

				<table className="table-auto">
					<thead>
						<tr>
							<th className="px-4 py-2 text-center"> </th>
							<th className="px-4 py-2 text-center">Product</th>
							<th className="px-4 py-2 text-center">Quantity</th>
							<th className="px-4 py-2 text-center">Price</th>
						</tr>
					</thead>
					<tbody>
						{orderDetails &&
							orderDetails.orderLine?.map((item, index) => (
								<tr key={index}>
									<td className="">
										<img
											src={item.product_id.picture}
											alt={item.product_id.title}
											className="h-10 w-10 object-cover"
										/>
									</td>
									<td className="px-4 py-2 text-center">
										{item.product_id.title}
									</td>
									<td className="px-4 py-2 text-center">{item.orderQty}</td>
									<td className="px-4 py-2 text-center">${item.extPrice}</td>
								</tr>
							))}
						{orderDetails && (
							<tr className="mt-4">
								<td colSpan={3} className="px-4 py-2 text-right font-semibold">
									Cart Total:
								</td>
								<td className="px-4 py-2 text-right">
									{orderDetails.orderTotal.toFixed(2)}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="max-w-md mx-auto p-6 mt-8">
				<button
					className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
					onClick={handlePlaceOrderClick}
					style={{ alignSelf: 'flex-end' }}
				>
					Place Order
				</button>
			</div>
		</>
	);
}
