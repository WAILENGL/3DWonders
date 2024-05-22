//   //patch, post
import {
  updateCartDetails,
  createCartDetails,
  deleteCartItem,
} from "./cart-service";
import { produce } from "immer";

export const handleCart = async (type, cartState, quantity, productId) => {
  const orderLineFinder = finder(cartState, productId);
  console.log(orderLineFinder, cartState, quantity, productId);

  if (orderLineFinder !== -1) {
    const currentQty = cartState.orderLine[orderLineFinder].orderQty;
    const newQty = currentQty + quantity;

    if (newQty <= 0) {
      alert(
        "Quantity can't be zero or negative, removing the item from the cart",
      );
      return cartState;
    }

    const nextState = produce(cartState, (draft) => {
      if (draft.orderLine[orderLineFinder].orderQty + quantity !== 0) {
        draft.orderLine[orderLineFinder].orderQty += quantity;
        draft.totalQty += quantity;
      }
    });

    const updatedCart = await updateCartDetails(
      nextState.orderLine[orderLineFinder],
      nextState._id,
    );
    console.log(
      "this",
      updatedCart,
      nextState.orderLine[orderLineFinder],
      nextState,
    );
    return nextState;
  } else {
    const orderLine = {
      product_id: productId,
      orderQty: quantity,
    };

    const nextState = produce(cartState, (draft) => {
      draft?.orderLine?.push(orderLine);
      draft.totalQty += quantity;
    });
    const updatedCart = await createCartDetails(cartState._id, orderLine);
    console.log(nextState, updatedCart);
    return nextState;
  }
};

export const finder = (cartState, productId) => {
  const orderLineFinder = cartState?.orderLine?.findIndex(
    (item) =>
      item.product_id._id === productId || item.product_id === productId,
  );
  return orderLineFinder;
};

export const deleteCart = (productId, cartStates) => {
  console.log(finder(cartStates, productId));
  const nextState = produce(cartStates, (draft) => {
    draft.totalQty -=
      cartStates.orderLine[finder(cartStates, productId)].orderQty;
    draft.orderLine.splice([finder(cartStates, productId)], 1);
  });
  deleteCartItem(productId);
  return nextState;
};
