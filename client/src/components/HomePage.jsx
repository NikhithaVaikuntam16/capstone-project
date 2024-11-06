import eCommerceImage from "../assets/images/eCommerce.jpg";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="navbar">Navbar</div>
      <div className="homepage-image">
        <img src={eCommerceImage} alt="Ecommerce homepage image" />
      </div>
    </div>
  );
};

export default HomePage;
