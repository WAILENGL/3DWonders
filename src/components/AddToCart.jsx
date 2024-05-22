import { useState } from "react";
// import debug from "debug";

import { useAtom, useAtomValue } from "jotai";
import { cartItems } from "../../atom";
import { loginSts } from "../../atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { getCartDetails } from "../utilities/cart-service"
import { handleCart } from "../utilities/cartHandler";
import { getCartDetails } from "../utilities/cart-service";

// const log = debug("mern:pages:AddToCart");

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [cartState, setCartState] = useAtom(cartItems);

  const userDetails = useAtomValue(loginSts);
  const navigate = useNavigate();

  function handleIncreaseQty() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }
  console.log(cartState);
  function handleDecreaseQty() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  const handleAddToCart = async (event) => {
    console.log(userDetails);
    if (userDetails !== null || userDetails) {
      setCartState(
        await handleCart(event.target.name, cartState, quantity, productId)
      );
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    async function getDetails() {
      let results = await getCartDetails();
      setCartState(results);
    }
    // console.log("here before")
    getDetails();
  }, [setCartState]);

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div className="text-lg font-medium text-gray-900" id="slide-over-title">
        Quantity
      </div>
      <p className="text-gray-500 border-emerald-200 border-2 w-8 text-center">{quantity}</p>
      <button
        onClick={handleIncreaseQty}
        className="border-0	border-black w-6 hover:bg-green-200 text-black"
      >
        +
      </button>
      <button
        onClick={handleDecreaseQty}
        className="border-0	border-black w-6 hover:bg-red-200 text-black"
      >
        -
      </button>
      <br />
      <button
        onClick={handleAddToCart}
        name="addcart"
        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
