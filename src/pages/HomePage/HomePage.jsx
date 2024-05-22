/* eslint-disable react/no-unescaped-entities */
import PopularItems from '../../components/PopularItems';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { cartItems } from '../../../atom';
import sendRequest from '../../utilities/send-request';

export default function HomePage() {
	const [cartState, setCartState] = useAtom(cartItems);

	console.log(cartState);
	useEffect(() => {
		async function getDetails() {
			const cartItems = await sendRequest(`/api/orders/getUserOrders/`);
			setCartState(cartItems);
		}
		getDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<img
				src="https://qhq1h9t6kkqlkwsy-13917519929.shopifypreview.com/cdn/shop/files/site-banner_1080x.jpg"
				alt="Banner"
				className="mx-auto"
			/>
			<div>
				<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl px-20">
					About Us:
				</h1>

				<p className="mt-4 text-xl text-gray-500 px-20">
					Welcome to 3D Printed Wonders, your gateway to a world of creativity
					and innovation! Dive into a realm where imagination knows no bounds
					and craftsmanship meets affordability. At 3D Printed Wonders, we
					curate a collection of awe-inspiring creations crafted by renowned 3D
					Printing designers, bringing you the marvels of 3D printing at
					accessible prices.
				</p>

				<p className="mt-4 text-xl text-gray-500 px-20">
					Explore our catalog and discover a fusion of artistry and technology,
					where each piece tells a story and every design captivates the senses.
					Join us on a journey where the extraordinary becomes ordinary, and
					where the wonders of 3D printing are just a click away.
				</p>
				<p className="mt-4 text-xl text-gray-500 px-20">
					Experience the future of craftsmanship with 3D Printed Wonders – where
					innovation meets affordability, and imagination knows no limits.
				</p>
			</div>
			<hr />
			<div className="mt-10 text-center">
				<PopularItems />
			</div>
		</>
	);
}
