import { getCartDetails } from '../../utilities/cart-service';
// import debug from 'debug';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { cartItems, loginSts } from '../../../atom';
import { useEffect, useState } from 'react';
import { handleCart, deleteCart } from '../../utilities/cartHandler';

export default function CartCheckOut() {
	// const log = debug('mern:pages:CartCheckout:CartCheckout');

	const userDetails = useAtomValue(loginSts);
	const { _id } = userDetails;
	const userid = _id;

	const navigate = useNavigate();
	const [cartStates, setCartState] = useAtom(cartItems);
	const [displayMsg, setDisplayMsg] = useState('');

	// log('user %o', userid);
console.log(userid)


	const style = {
		display: 'flex',
		// background:"yellow",
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		// maxWidth:"1000px"
	};

	const handleQty = async (event) => {
		// console.log(cartStates,event.target.value);
		setCartState(
			await handleCart(
				'NA',
				cartStates,
				parseInt(event.target.value),
				event.target.name
			)
		);
	};

	const handleRemove = async (event) => {
		setCartState(deleteCart(event.target.name, cartStates));
	};

	// console.log(cartStates);
	useEffect(() => {
		async function getDetails() {
			let results = await getCartDetails(userDetails._id);
			setCartState(results);
		}
		// console.log("here before")
		getDetails();
	}, [setCartState, userDetails._id]);

	const subtotal = cartStates?.orderLine?.reduce(
		(total, item) => total + item.product_id.price * item.orderQty,
		0
	);

	// const DisplayItems = () =>
	// {
	//     if(cartStates?.orderLine?.length === 0)
	//     {
	//       return ("Please at least add some item !")
	//     }
	//     return cartStates?.orderLine?.map((item, index) => (
	//         <tr key={index} style={{ textAlign: "center" }}>
	//           <td className="border-4 border-green-500/100">{index + 1}</td>
	//           <td className="border-4 border-green-500/100">
	//             <div style={{display:"flex",justifyContent:"center",maxWidth:"150px"}}>
	//               <img src={item.product_id.picture} className="" alt="img"></img>
	//             </div>
	//           </td>
	//           <td className="border-4 border-green-500/100">{item.product_id.title}</td>
	//           {/* <td className="border-4 border-green-500/100">{item.orderQty}</td> */}
	//           <td className="border-4 border-green-500/100">
	//           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
	//             <div style={{display:"flex",flexDirection:"row",width:"150px",justifyContent:"center"}}>
	//               <button onClick={handleQty} name={item.product_id._id}
	//               className="border-slate-500 box-content h-2 w-2 p-2 border-2 text-center" value={[1,item.orderQty]} >+</button>
	//               <p className="border-2 border-y-indigo-950">{item.orderQty}</p>
	//               <button onClick={handleQty} className="border-2 border-slate-500" name={item.product_id._id} value={[-1,item.orderQty]}>-</button>
	//             </div>
	//               <button onClick={handleRemove} name={item.product_id._id} >❌</button>
	//           </div>
	//           </td>
	//           <td className="border-4 border-green-500/100">${(item.product_id.price  * item.orderQty).toFixed(2)}</td>
	//         </tr>
	//       ))
	// }

	const handleCheckout = () => {
		//!navigate
		if (cartStates.orderLine.length !== 0) {
			navigate(`/user/checkout`);
		} else {
			setDisplayMsg("You can't check out ! There's no item in your cart!");
		}
	};
	// console.log(DisplayItems)
	console.log(cartStates);

	const orderDetails =
		cartStates &&
		cartStates?.orderLine?.map((item, idx) => {
			return (
				<ul
					role="list"
					className="divide-y divide-blue-200 hover:divide-pink-200"
					key={idx}
					style={{ width: '100%' }}
				>
					<p></p>
					<li className="flex justify-between gap-x-20 py-5">
						<div className="flex min-w-0 gap-x-4">
							<img
								className="h-14 w-14 flex-none rounded-full bg-gray-50"
								src={item.product_id.picture}
								alt=""
							/>
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{item.product_id.title}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									Unit Price: {item.product_id.price} | Qty {item.orderQty}
								</p>
							</div>
						</div>
						<div
							className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<p className="text-sm leading-6 text-gray-900">
								${(item.product_id.price * item.orderQty).toFixed(2)}
							</p>
							{item !== 'Delivered' ? (
								<p
									className="mt-1 text-xs leading-5 text-gray-500"
									style={{
										display: 'flex',
										justifyItems: 'right',
										alignContent: 'space-evenly',
									}}
								>
									<button
										onClick={handleQty}
										name={item.product_id._id}
										className="border-0	border-black w-6 hover:bg-green-200 text-black"
										value="1"
									>
										+
									</button>

									<button
										onClick={handleQty}
										name={item.product_id._id}
										value="-1"
										className="border-0	border-black w-6 hover:bg-red-200 text-black"
									>
										-
									</button>

									<button
										onClick={handleRemove}
										name={item.product_id._id}
										className="border-0	border-black w-6 hover:bg-sky-200 text-black"
									>
										❌
									</button>
								</p>
							) : (
								<div className="mt-1 flex items-center gap-x-1.5">
									<div className="flex-none rounded-full bg-emerald-500/20 p-1">
										<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
									</div>
									<p className="text-xs leading-5 text-gray-500">
										Delivered Successfully
									</p>
								</div>
							)}
						</div>
					</li>
					{/* <br className="divide-black"/> */}
					<p></p>
				</ul>
			);
		});

	return (
		<div style={style}>
			<div style={{ padding: '50px' }} className="text-4xl">
				Your Cart Summary 🛒
			</div>
			{orderDetails}
			{(subtotal || displayMsg) && (
				<span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-2xl font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 m-8">
					Subtotal: $ {subtotal.toFixed(2)}
				</span>
			)}
			<button
				onClick={handleCheckout}
				className="rounded-lg border border-slate-300 hover:border-slate-400 text-2xl"
			>
				Checkout
			</button>
			<p>{displayMsg}</p>
		</div>
	);
}
