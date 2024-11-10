import axios from "axios";

const fetchProducts = async ({ queryKey }) => {
    const categoryId = queryKey[1];
    try {
        const result = await axios.get(`/api/products?category=${categoryId}`);
        return result.data.products;
    }catch(err) {
        console.log("Error while fetching products:", err);
    }
};

export default fetchProducts;