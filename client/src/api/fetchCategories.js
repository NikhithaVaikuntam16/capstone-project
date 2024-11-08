import axios from "axios";

const fetchCategories = async () => {
  try {
    const result = await axios.get("/api/categories");
    return result.data.categories;
  } catch (err) {
    console.log("Error while fetching categories:", err);
  }
};

export default fetchCategories;
