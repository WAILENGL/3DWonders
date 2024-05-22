import { useLocation } from 'react-router-dom';

export default function OrderConfirmationPage() {
	const location = useLocation();

	const { orderDetails, customerDetails } = location.state;

	return (
		<div className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-3xl font-semibold mb-4">
				Thank You For Your Order, {customerDetails.name}!
			</h1>
			<p className="text-gray-600 mb-4 text-center">Your order ID: {orderDetails._id}</p>

			<div>
				<h2 className="text-2xl font-semibold mb-2 text-center mt-8">
					Here are your order details:
				</h2>
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
		</div>
	);
}
