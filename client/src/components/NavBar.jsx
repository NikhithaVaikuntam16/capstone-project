import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import fetchCategories from "../api/fetchCategories";

const NavBar = () => {
  const { data : categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while loading categories...</div>;
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Icon icon="logos:shopify" className="logo" />
        </Link>
        <ul className="category-list">
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <Link to={`/category/${category.id}`} className="links">
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="links">
          Login
        </Link>
        <Link to="/orders" className="links">
          Orders
        </Link>
        <Link to="/cart" className="cart">
          <Icon icon="game-icons:shopping-cart" className="cart-icon" />
          <span className="cart-count">0</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
