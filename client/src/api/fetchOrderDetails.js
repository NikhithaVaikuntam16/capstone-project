import axios from "axios";

const fetchOrderDetails = async ({ queryKey }) => {
    const id = queryKey[1];
    try {
      const response = await axios.get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.orderDetails;
    } catch (err) {
      console.log("Error while fetching order details:", err);
    }
  };

export default fetchOrderDetails;