import { useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";
import Modal from "./Modal";
import axios from "axios";

const ShoppingCartPage = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartValid, setIsCartValid] = useState(true);
  const [clickedItemId, setClickedItemId] = useState(null);
  const {
    cart,
    getCartCount,
    removeFromCart,
    addToCart,
    isLoggedIn,
    clearCart,
  } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailsArray = cart.map(async (item) => {
          const result = await axios.get(`/api/products/${item.product_id}`);
          return { ...result.data.productDetails, quantity: item.quantity };
        });
        const result = await Promise.all(detailsArray);
        setProductDetails(result);
      } catch (err) {
        console.log("Error while fetching product details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchProductDetails();
    } else {
      setIsLoading(false);
    }
  }, [cart]);

  useEffect(() => {
    const validateCart = () => {
      const hasStockIssues = productDetails?.some(
        (item) => item.stock < item.quantity,
      );
      setIsCartValid(!hasStockIssues);
    };

    validateCart();
  }, [productDetails]);

  if (isLoading) {
    return <div className="cart-page">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is empty</h2>
      </div>
    );
  }

  const getTotalItemsCost = () => {
    return productDetails.length > 0
      ? productDetails.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        )
      : 0;
  };

  const handleDeleteItem = (id) => {
    removeFromCart(id);
    setClickedItemId(null);
  };

  const handleOrderClick = async (productDetails) => {
    try {
      const orderResponse = await axios.post(
        "/api/orders",
        {
          productDetails,
          totalPrice: (getTotalItemsCost() * 1.06).toFixed(2),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (orderResponse.data.success) {
        alert(
          `Order placed successfully!!! OrderID: ${orderResponse.data.orderId}`,
        );
        await clearCart();
      } else {
        console.error("Order placement failed. Response:", orderResponse.data);
        alert("Failed to place the order. Please try again.");
      }
    } catch (err) {
      console.log("Error on clicking place order button:", err);
      alert(`Failed to place the order. Please try again.!! ${err.message}`);
    }
  };

  return (
    productDetails.length > 0 && (
      <div className="cart-page">
        <h2 style={{ marginBottom: "2rem" }}>Your Shopping Cart</h2>
        <div className="cart-items-summary-details">
          <div className="cart-items">
            {productDetails?.map((item) => {
              return (
                <div key={item.id} className="each-cart-item">
                  <div className="each-item-details">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      width="140px"
                      height="140px"
                    />
                    <div>
                      <h3 style={{ marginTop: "0", lineHeight: "1.4" }}>
                        <Link
                          to={`/products/${item.id}`}
                          className="product-link"
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <p>${item.price}</p>
                      {item.stock >= item.quantity ? (
                        <p style={{ color: "green" }}>In Stock</p>
                      ) : (
                        <div>
                          <p style={{ color: "red" }}>
                            Out of Stock...{" "}
                            {item.stock === 0 ? (
                              <span className="oos-error">
                                This item is unavailable, please remove the item
                                to proceed.
                              </span>
                            ) : (
                              <span className="oos-error">
                                Only {item.stock}{" "}
                                {item.stock === 1 ? "item" : "items"} available,
                                please reduce the quantity to proceed.
                              </span>
                            )}
                          </p>
                        </div>
                      )}

                      <label htmlFor="quantity" style={{ fontWeight: "bold" }}>
                        Qty: {item.quantity}
                        <div
                          id="quantity"
                          style={{ marginTop: "0", height: "50px" }}
                        >
                          <button
                            onClick={() =>
                              addToCart({
                                productId: item.id,
                                quantity: -1,
                              })
                            }
                            disabled={item.quantity === 1 ? true : false}
                          >
                            -
                          </button>
                          <h4>{item.quantity}</h4>
                          <button
                            onClick={() =>
                              addToCart({
                                productId: item.id,
                                quantity: 1,
                              })
                            }
                            disabled={
                              item.stock >= item.quantity ? false : true
                            }
                          >
                            +
                          </button>
                        </div>
                      </label>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => setClickedItemId(item.id)}
                    >
                      <Icon
                        icon="mdi:multiply"
                        style={{ color: "black", fontSize: "1.3rem" }}
                      />
                    </button>
                  </div>
                  {clickedItemId === item.id && (
                    <Modal>
                      <div className="modal-div">
                        <div>
                          <img
                            src={item.image_url}
                            alt={item.name}
                            width="50px"
                          />
                          <div className="message">
                            <h4 style={{ margin: "0" }}>Remove from Cart</h4>
                            <p>
                              Are you sure to remove this item from the cart?
                            </p>
                          </div>
                          <button
                            className="close-btn"
                            onClick={() => setClickedItemId(null)}
                          >
                            <Icon
                              icon="mdi:multiply"
                              style={{ color: "black", fontSize: "25px" }}
                            />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            handleDeleteItem(item.id);
                          }}
                        >
                          Yes
                        </button>
                        <button onClick={() => setClickedItemId(null)}>
                          No
                        </button>
                      </div>
                    </Modal>
                  )}
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <h3 style={{ marginTop: "0" }}>Order Summary</h3>
            <div className="summary-div">
              <div>
                <p>Items ({getCartCount()}):</p>
                <p>Estimated tax:</p>
                <h4>Total Amount:</h4>
              </div>
              <div className="price-details">
                <p>{getTotalItemsCost().toFixed(2)}</p>
                <p>{(getTotalItemsCost() * 0.06).toFixed(2)}</p>
                <h4>{(getTotalItemsCost() * 1.06).toFixed(2)}</h4>
              </div>
            </div>
            <button
              className="place-order-btn"
              disabled={!isCartValid || !isLoggedIn}
              onClick={() => handleOrderClick(productDetails)}
            >
              Place Order
            </button>
            {isCartValid && !isLoggedIn && (
              <p
                style={{
                  color: "red",
                  fontSize: "13px",
                  letterSpacing: "0.4px",
                }}
              >
                Please <Link to="/login">Login</Link> to your account to place
                the order
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ShoppingCartPage;
