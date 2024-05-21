export const createProduct = async (product) => {
  const url = `/api/product/createnew`;
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(product),
  });
  const cartDetail = await response.json();
  console.log(cartDetail);
  return cartDetail;
};
