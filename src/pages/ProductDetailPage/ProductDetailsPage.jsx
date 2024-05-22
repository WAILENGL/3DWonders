import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../../components/AddToCart";
import debug from "debug";
// import { loginSts } from "../../../atom";
// import { useAtomValue } from "jotai";

const log = debug("mern:pages:ProductDetailsPage");

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        log(`Fetching product with ID: ${productId}`);
        const response = await fetch(`/api/product/${productId}`);
        // const response = await fetch(`/api/product/product/${productId}`);

        log(`Response status: ${response.status}`);
        log(`Response content-type: ${response.headers.get("content-type")}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product: ${response.status} ${response.statusText}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div>
        <img src={product.picture} alt={product.title} />
      </div>
      <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {product.title}
      </div>
      <div className="text-3xl tracking-tight text-gray-900">
        {product.price}
      </div>
      <div className="text-sm font-medium text-gray-900">
        {product.description}
      </div>
      <hr />
      <AddToCart productId={productId} />
    </>
  );
}
