import { useState, createContext, useEffect } from "react";
import fetchCartItems from "../api/fetchCartItems";
import axios from "axios";

const CartContext = createContext();

export default CartContext;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn) {
        const cartItems = await fetchCartItems();
        setCart(cartItems);
      } else {
        const localCart = localStorage.getItem("cart");
        setCart(localCart ? JSON.parse(localCart) : []);
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  const addToCart = async (product) => {
    if (isLoggedIn) {
      try {
        await axios.post("/api/cart", product, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const cartItems = await fetchCartItems();
        setCart(cartItems);
      } catch (err) {
        console.log("Error while adding items to cart:", err);
      }
    }else {
      setCart((prevCartItems) => {
        const existingProductIndex = prevCartItems.findIndex(
          (item) => item.product_id === product.productId,
        );
        if (existingProductIndex >= 0) {
          const updatedCart = [...prevCartItems];
          updatedCart[existingProductIndex].quantity += product.quantity;
          return updatedCart;
        }
        return [
          ...prevCartItems,
          { product_id: product.productId, quantity: product.quantity },
        ];
      });
    }
  };

  const getCartCount = () => {
    return cart.length > 0
      ? cart.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  const syncCartToDatabase = async () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (localCart.length > 0) {
      try {
        await axios.post("api/cart/sync", localCart, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        localStorage.removeItem("cart");
      } catch (err) {
        console.log("Error syncing cart:", err);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoggedIn,
        setIsLoggedIn,
        addToCart,
        getCartCount,
        syncCartToDatabase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
