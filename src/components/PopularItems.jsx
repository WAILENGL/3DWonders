import ProductListingPage from "../pages/ProductListingPage/ProductListingPage";

export default function PopularItems() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Popular Items
      </h1>
      <ProductListingPage />
    </>
  );
}
