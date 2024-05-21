export const getListofProducts = async () => {
  //orderController.getOrder
  const url = `/api/product/home`;
  const response = await fetch(url);
  const myResults = await response.json();
  return myResults;
};

// get cart details using user Id
