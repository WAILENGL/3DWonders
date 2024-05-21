export const getAllOrders = async () => {
  const url = `/api/orders/order`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const updateOrder = async (body, id) => {
  const url = `/api/orders/order/updateStatus`;
  console.log(body, id);
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  const cartDetail = await response.json();
  // console.log(cartDetail);
  return cartDetail;
};
