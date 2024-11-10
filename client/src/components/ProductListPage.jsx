import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../api/fetchProducts";

const ProductListPage = () => {
  const { id } = useParams();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while loading products...</div>;
  }

  return (
    <div className="products-list">
      {products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <div className="product-image">
              <img src={product.image_url} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>
                <Link to={`/products/${product.id}`} className="product-link">{product.name}</Link>
              </h3>
              <p>${product.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductListPage;
