import axios from "axios";

const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cartArray = result.data.cart;
      return cartArray.length > 0 ? cartArray : [];
    } catch (err) {
      console.log("Error while fetching cart items:", err);
    }
  };

export default fetchCartItems;