import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductDescription from "./ProductDescription";
import fetchProductDetails from "../api/fetchProductDetails";
import fetchStockAvailability from "../api/fetchStockAvailability";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: fetchProductDetails,
  });

  const { data: stockData, isError: stockError } = useQuery({
    queryKey: ["stockAvailability", id, quantity],
    queryFn: fetchStockAvailability,
    refetchOnWindowFocus: true,
    staleTime: 0
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while loading products...</div>;
  }

  if (stockError) {
    return <div>Error while checking product availability...</div>;
  }

  const isStockAvailable = stockData?.availability;

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
          <div className="other-info">
            <h3 style={{ color: isStockAvailable ? "green" : "red" }}>
              {isStockAvailable ? "In Stock" : "Out of Stock"}
            </h3>
            <label htmlFor="quantity">
              Qty:
              <div id="quantity">
                <button
                  value="-"
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                  disabled={quantity === 0 ? true : false}
                >
                  -
                </button>
                <h4>{quantity}</h4>
                <button
                  value="+"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  disabled={!isStockAvailable}
                >
                  +
                </button>
              </div>
            </label>
            <button
              className="add-btn"
              disabled={!(quantity && isStockAvailable)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
