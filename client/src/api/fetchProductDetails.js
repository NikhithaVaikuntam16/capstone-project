import axios from "axios";

const fetchProductDetails = async ({ queryKey}) => {
    const id = queryKey[1];
    try {
      const result = await axios.get(`/api/products/${id}`);
      return result.data.productDetails;
    } catch (err) {
      console.log("Error while fetching product details:", err);
    }
  };

export default fetchProductDetails;