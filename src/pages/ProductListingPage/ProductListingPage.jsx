import { getListofProducts } from "../../utilities/getListofProducts";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import debug from "debug";

export default function ProductListingPage() {
  const [prodResults, setprodResults] = useState("");
  const log = debug("mern:pages:ProductListingPage:ProductListingPage");
  const navigate = useNavigate();

  // limit results.
  useEffect(() => {
    async function getDetails() {
      let results = await getListofProducts();
      results = results?.sort((b, a) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
      setprodResults(results);
    }
    getDetails();
  }, []);

  log("productResults %o", prodResults);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const ProductList = () => (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {prodResults?.map((product, index) => (
        <div
          key={index}
          onClick={() => handleClick(product._id)}
          className="group"
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={product.picture}
              alt={product.title}
              style={{ maxWidth: "100%" }}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>

          <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>

          <p className="mt-1 text-lg font-medium text-gray-900">
            {product.price}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Product Details Page</h2>
        {prodResults && <ProductList />}
      </div>
    </div>
  );
}
