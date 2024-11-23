import axios from "axios";

const fetchStockAvailability = async (productId, quantity, cart) => {
  const id = productId;
  try {
    const response = await axios.get(`/api/products/${id}/stock`);
    const stockAvailability = response.data.stock;
    const reservedQuantity =
      cart.find((item) => item.productId === id)?.quantity || 0;
    return {
      availability: stockAvailability >= (reservedQuantity + quantity),
    };
  } catch (err) {
    console.log("Error fetching stock availability:", err);
  }
};

export default fetchStockAvailability;
