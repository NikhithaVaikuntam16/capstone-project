import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import fetchStockAvailability from "../api/fetchStockAvailability";
import CartContext from "./CartContext";

const ProductPurchasePanel = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const { addToCart, cart } = useContext(CartContext);
  const { data: stockData, isError: stockError } = useQuery({
    queryKey: ["stockAvailability", productId, quantity],
    queryFn: () => fetchStockAvailability(productId, quantity, cart),
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  if (stockError) {
    return <div>Error while checking product availability...</div>;
  }

  const isStockAvailable = stockData?.availability;

  const handleAddToCart = () => {
    addToCart({
      productId,
      quantity,
    });
    setIsAddButtonClicked(true);
    setQuantity(1);
  };

  return (
    <div className="product-purchase-controls">
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
            disabled={quantity === 1 ? true : false}
          >
            -
          </button>
          <h4>{quantity}</h4>
          <button
            value="+"
            onClick={() => {
              setQuantity(quantity + 1);
              setIsAddButtonClicked(false);
            }}
            disabled={!isStockAvailable}
          >
            +
          </button>
        </div>
      </label>
      {isAddButtonClicked ? (
        <button className="add-btn">
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            Go to Cart 🛒
          </Link>
        </button>
      ) : (
        <button
          className="add-btn"
          disabled={!isStockAvailable}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
      {isAddButtonClicked && (
        <span
          style={{ color: "green", fontSize: "14px", letterSpacing: "0.4px" }}
        >
          ✅ Added to cart successfully
        </span>
      )}
    </div>
  );
};

export default ProductPurchasePanel;
