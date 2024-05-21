import sendRequest from "./send-request";

export const getCartDetails = () => {
  return sendRequest(`/api/orders/getUserOrders/`);
};

//update
export const updateCartDetails = async (body, orderId) => {
  const cartDetail = sendRequest(`/api/orders/update/${orderId}`, "POST", body);
  return cartDetail;
};
//create
export const createCartDetails = async (orderId, orderLine) => {
  sendRequest(`/api/orders/create/${orderId}`, "POST", orderLine);
};

//delete
export const deleteCartItem = async (productId) => {
  sendRequest(`/api/orders/update/${productId}`, "DELETE");
};
