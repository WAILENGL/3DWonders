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

export const deleteProduct = async (productID) => {
  const url = `/api/product/${productID}`;
  console.log("delete product servcie", url);

  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });
  const cartDetail = await response.json();
  console.log(cartDetail);
  return cartDetail;
};
