import debug from 'debug';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/';
import AuthPage from '../AuthPage/AuthPage';
import { useAtomValue } from 'jotai';
import { loginSts } from '../../../atom';

// import NewOrderPage from "../NewOrderPage/NewOrderPage";
// import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import AdminViewOrderDetails from '../AdminViewOrderDetails/AdminViewOrderDetails';
import UserProfile from '../UserProfile/UserProfile';
import HomePage from '../HomePage/HomePage';
import ProductListingPage from '../ProductListingPage/ProductListingPage';
import ProductDetailsPage from '../ProductDetailPage/ProductDetailsPage';
import CartCheckOut from '../CartCheckout/CartCheckOut';
import CheckOutPage from '../CheckoutPage/CheckOutPage';
import OrderConfirmationPage from '../OrderConfirmationPage/OrderConfirmationPage';
import AdminPage from './Admin/Admin';
import { createContext } from 'react';
export const DataContext = createContext();

const log = debug('mern:pages:App:App');

function App() {
	const user = useAtomValue(loginSts);


	log('user %o', user);


  const MainAuth = () => {
	if (!user) {
		return (
			<main className="App">
				{/* <AuthPage /> */}
				<Routes>
					<Route path="/auth" element={<AuthPage />}/>	
					<Route path="/" element={<HomePage />}/>
					<Route path="/products" element={<ProductListingPage />}/>
					<Route path="/product/:productId/" element={<ProductDetailsPage />}/>
					<Route path="*" element={<Navigate to="/auth"  />} />
				</Routes>
			</main>
		);
	}
  else {
    return (
    <Routes>
	<Route path="/admin" element={<AdminPage />}/>
	<Route path="/admin/vieworder/:orderid" element={<AdminViewOrderDetails />}/>
      <Route path="/" element={<HomePage />}/>
      <Route path="/products" element={<ProductListingPage />}/>
      <Route path="/user/" element={<UserProfile />}/>
      <Route path="/product/:productId/" element={<ProductDetailsPage />}/>
      <Route path="/user/cart" element={<CartCheckOut />} />
      <Route path="/user/checkout" element={<CheckOutPage />}/>
	    <Route path="/user/thankyou" element={<OrderConfirmationPage />}/>
    	<Route path="*" element={<Navigate to="/"  />} />

    </Routes>)
  }
}


	return (
		<>
			{/* <DataContext.Provider value={user}> */}
				<NavBar />
				<main
					className="App"
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
						flexDirection: 'column',
					}}
				>
					<MainAuth />
				</main>
			{/* </DataContext.Provider> */}
		</>
	);
}

export default App;
