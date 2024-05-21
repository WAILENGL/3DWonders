/* eslint-disable react/no-unescaped-entities */
import PopularItems from "../../components/PopularItems";
import { useEffect } from "react";
import {useAtom} from "jotai"
import { cartItems } from "../../../atom";
import sendRequest from "../../utilities/send-request";

export default function HomePage() {
  const [cartState,setCartState] = useAtom(cartItems);


  console.log(cartState)
  useEffect(() => {
    async function getDetails()
      {
        const cartItems = await sendRequest(`/api/orders/getUserOrders/`);
        setCartState(cartItems);
      }
      getDetails();   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <img
        src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
        alt="Banner"
      />
      <div>
        <h1>About Us:</h1>
        <p>
          Welcome to TrendyHub, your number one source for the latest and
          greatest in fashion. We are dedicated to providing you the best of
          apparel, with a focus on quality, customer service, and uniqueness.
          TrendyHub started in 2022, and has come a long way from its beginnings
          in a small office. When we first started out, our passion for
          eco-friendly and stylish clothing drove us to start our own business.
          We hope you enjoy our products as much as we enjoy offering them to
          you. If you have any questions or comments, please do not hesitate to
          contact us.
        </p>
      </div>
      <hr />
      <PopularItems />
    </>
  );
}
