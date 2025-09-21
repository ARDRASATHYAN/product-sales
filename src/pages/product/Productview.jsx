import { useQuery } from "@tanstack/react-query";
import DisplayGrid from "../../components/DisplayGrid";
import { fetchProducts } from "../../services/productapi/productapi";
import ProductCard from "./component/ProductCard";


const Productview = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <>

      <DisplayGrid
        data={products}
        renderItem={(product) => (
          <ProductCard
            key={product.productId}
            productName={product.productName}
            productDescription={product.productDescription}
            units={product.units}
            productId={product.productId}
          />
        )}

        isLoading={isLoading}
        isError={isError}
        emptyState={<div>No products found.</div>}
        loadingState={<div>Loading products...</div>}
        errorState={<div>Failed to load products.</div>}
      />

    </>
  );
}



export default Productview;