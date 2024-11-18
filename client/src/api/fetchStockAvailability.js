import axios from "axios";

const fetchStockAvailability = async ({ queryKey : [_, id, quantity]}) => {
    try {
      const response = await axios.get(
        `/api/products/${id}/stock?quantity=${quantity}`,
      );
      return response.data;
    } catch (err) {
      console.log("Error fetching stock availability:", err);
    }
  };

export default fetchStockAvailability;