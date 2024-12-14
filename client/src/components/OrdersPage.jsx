import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(CartContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data.orders);
      } catch (err) {
        console.log("Error while fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchOrders();
    }else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="orders-page">
        <h3 style={{ letterSpacing: "0.5px" }}>
          Please <Link to="/login">Login</Link> to your account to view your
          orders.
        </h3>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h2 style={{ letterSpacing: "0.5px" }}>No orders found...</h2>
      </div>
    );
  }

  const getformattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
        dateStyle: "long", 
        timeStyle: "short"  
    });
    return formattedDate;
  }

  return (
    <div className="orders-page">
      <h2 style={{letterSpacing: "0.5px", marginBottom:"2rem"}}>Your Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Number of items</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => {
            return (
              <tr key={order.id}>
                <td className="table-data"><Link to={`/orders/${order.id}`} className="orderid-links">{order.id}</Link></td>
                <td>${order.total_price}</td>
                <td>{getformattedDate(order.created_at)}</td>
                <td>{order.totalItems}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
