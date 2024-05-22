import { useState } from "react";
// import debug from "debug";

import {useAtom,useAtomValue} from "jotai"
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
  const [cartState,setCartState] = useAtom(cartItems);

  const userDetails = useAtomValue(loginSts);
  const navigate = useNavigate();

  function handleIncreaseQty() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }
  console.log(cartState)
  function handleDecreaseQty() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      
    }
  }

const handleAddToCart = async (event) =>
{
  console.log(userDetails)
  if(userDetails !== null || userDetails )
  {
    setCartState(await handleCart(event.target.name,cartState,quantity,productId))
  }
  else{
    navigate("/auth")
  }
}

  useEffect(() => {
    async function getDetails() {
      let results = await getCartDetails();
      setCartState(results);
    }
    // console.log("here before")
    getDetails();
  }, [setCartState]);

  return (
    <div>
      <div>Quantity</div>
      <p>{quantity}</p>
      <button onClick={handleIncreaseQty}>+</button>
      <button onClick={handleDecreaseQty}>-</button>
      <br />
      <button onClick={handleAddToCart} name="addcart">Add to Cart</button>
    </div>
  );
}
