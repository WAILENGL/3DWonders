import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { loginSts } from '../../../atom';
import { logOut } from '../../utilities/users-service';
import sendRequest from '../../utilities/send-request';
import { useNavigate } from 'react-router-dom';
import { cartItems } from '../../../atom';
import { getCartDetails } from '../../utilities/cart-service';

export default function UserProfile() {
	const [userOrders, setUserOrders] = useState(null);
	const [clickedOrder, setClickedOrder] = useState(null);
	const [user, setUser] = useAtom(loginSts);
	const [cartState, setCartState] = useAtom(cartItems);
	/* const [userOrderDetails , setUserOrderDetails] = useState(null);
	 */
	//fetch orders under userId

	console.log(cartState);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrderIds = async () => {
			try {
				const data = await sendRequest(`/api/user/orders`);
				setUserOrders(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOrderIds();
	}, [user]);

	useEffect(() => {
		async function getDetails() {
			let results = await getCartDetails();
			setCartState(results);
		}
		// console.log("here before")
		getDetails();
	}, [setCartState]);

	const handleLogOut = () => {
		navigate('/');
		logOut();
		setCartState('');
		setUser(null);
	};

	const handleOrderClick = async (order) => {
		try {
			// console.log('orderid', order);
			const response = await fetch(`/api/orders/order/${order}`);
			console.log(response);
			const data = await response.json();
			setClickedOrder(data[data.findIndex((x) => x._id === order)]);
			// console.log('orderdata', clickedOrder);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="flex flex-wrap justify-center">
				<div className="w-full sm:w-1/2 orderHistory">
					<div className="p-6 max-w-3xl mx-auto bg-white flex items-center space-x-4">
						<div>
							<h4 className="text-xl font-medium text-black text-center">
								Order History
							</h4>
							{userOrders &&
								userOrders.map((order) => (
									<div key={order}>
										<button
											onClick={() => handleOrderClick(order)}
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
											style={{ width: '250px' }}
										>
											{order}
										</button>
									</div>
								))}
							<button
								onClick={handleLogOut}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded w-full sm:w-auto mx-auto sm:mx-0 mt-6"
								style={{ width: '250px' }}
							>
								Log Out
							</button>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2">
					<div className="p-6 max-w-3xl mx-auto bg-white flex items-center space-x-4">
						<div>
							<h4 className="text-xl font-medium text-black text-center">
								Order Details
							</h4>
							<table className="min-w-full divide-y divide-gray-200 mt-2">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
										></th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
										>
											Product
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
										>
											Quantity
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
										>
											Price
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
										>
											Order Status
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{clickedOrder &&
										clickedOrder.orderLine?.map((lineItem) => (
											<tr key={lineItem._id}>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900 text-center">
														<img
															src={lineItem.product_id.picture}
															alt={lineItem.product_id.title}
															className="h-10 w-10 object-cover"
														/>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900 text-center">
														{lineItem.product_id.title}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900 text-center">
														{lineItem.orderQty}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-center">
														${lineItem.extPrice}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
													{clickedOrder.orderStatus}
												</td>
											</tr>
										))}
									<tr className="mt-4">
										<td
											colSpan={3}
											className="px-4 py-2 text-right font-semibold"
										>
											Order Total:{' '}
										</td>{' '}
										<td className="px-4 py-2 text-right">
											${clickedOrder && clickedOrder.orderTotal.toFixed(2)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

		</>
	);
}
