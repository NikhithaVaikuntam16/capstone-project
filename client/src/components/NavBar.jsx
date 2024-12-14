import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import fetchCategories from "../api/fetchCategories";
import { useContext, useState } from "react";
import CartContext from "./CartContext";

const NavBar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { getCartCount, isLoggedIn, setIsLoggedIn } = useContext(CartContext);
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while loading categories...</div>;
  }

  const handleLinkClick = () => {
    setIsMenuVisible(false);
  };

  const handleLogout = () => {
    setIsMenuVisible(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(!!localStorage.getItem("token"));
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="app-link">
          <Icon icon="icon-park-outline:application-effect" className="app-logo"/>
        </Link>
        <ul className="category-list">
          <div>
            <p>Categories</p>
            <hr />
          </div>
          {categories?.map((category) => {
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
        <div
          className="profile"
          onMouseOver={() => setIsMenuVisible(true)}
          onMouseLeave={() => setIsMenuVisible(false)}
        >
          <Icon icon="codicon:account" className="icons" />
          {isMenuVisible && (
            <div className="profile-menu">
              {isLoggedIn ? (
                <div>
                  <p>Hello, {localStorage.getItem("userName")}</p>
                  <hr />
                  <ul>
                    <li>
                      <Link
                        to="/orders"
                        className="profile-links"
                        onClick={handleLinkClick}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="profile-links"
                        onClick={handleLinkClick}
                      >
                        Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="profile-links"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="welcome-div">
                  <p>Welcome</p>
                  <div>
                    <Link
                      to="/login"
                      className="login-register-link"
                      onClick={handleLinkClick}
                    >
                      Login/Register
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="display-icons">
          <Link to="/orders">
            <Icon icon="lets-icons:order" className="icons" />
          </Link>
        </div>
        <div className="cart display-icons">
          <Link to="/cart">
            <Icon icon="game-icons:shopping-cart" className="cart-icon" />
            <span className="cart-count">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
