import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductDescription from "./ProductDescription";
import fetchProductDetails from "../api/fetchProductDetails";
import ProductPurchasePanel from "./ProductPurchasePanel";

const ProductDetailPage = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: fetchProductDetails,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while loading products...</div>;
  }

  return (
    <div className="details-page">
      {product && (
        <div className="details-container">
          <div className="image">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="info">
            <h2>{product.name}</h2>
            <h4>${product.price}</h4>
            <hr />
            <h3>About this item</h3>
            <ProductDescription description={product.description} />
          </div>
          <ProductPurchasePanel productId={id}/>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
