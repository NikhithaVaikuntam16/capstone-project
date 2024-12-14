import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchOrderDetails from "../api/fetchOrderDetails";
import { useState } from "react";
import Modal from "./Modal";
import { Icon } from "@iconify/react";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: fetchOrderDetails,
  });
  const [isViewButtonClicked, setIsViewButtonClicked] = useState(false);

  if (isLoading) {
    return <div className="order-details-page">Loading...</div>;
  }

  if (isError) {
    return (
      <div style={{fontSize:"18px", fontWeight: "bold", marginTop: "6rem", padding: "1rem 2rem", letterSpacing: "0.5px"}}>
        OrderID: {id} do not exist. Go back to <Link to="/orders">Orders</Link> Page.
      </div>
    );
  }

  const getformattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
    return formattedDate;
  };

  return (
    <div className="order-details-page">
      <div style={{ paddingTop: "10px" }}>
        <Link to="/orders" className="goback-link">
          Back to Orders
        </Link>
      </div>
      <div className="order-details-div">
        <h2 style={{ margin: "0 0 1rem 0" }}>Order Details</h2>
        <p className="order-date">
          Ordered on {getformattedDate(orderDetails.order_date)}
        </p>
        <span>OrderID: {orderDetails.order_id}</span>
        <div className="ordered-items">
          {orderDetails.order_items.map((item) => {
            return (
              <Link
                to={`/products/${item.product_id}`}
                key={item.product_id}
                className="each-ordered-item"
              >
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  width="100px"
                  height="100px"
                />
                <div>
                  <h4 style={{ marginTop: "0", lineHeight: "1.3" }}>
                    {item.product_name}
                  </h4>
                  <p>Price: ${item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </Link>
            );
          })}
          <div className="total-price-div">
            <p>Total Order Price:</p>
            <div>
              <p>${orderDetails.total_order_price}</p>
              <button className="view-button" onClick={() => setIsViewButtonClicked(true)}>View Breakup</button>
            </div>
          </div>
          {isViewButtonClicked && (
            <Modal>
              <div className="payment-model">
                <div className="payment-info">
                  <h3>Payment Information</h3>
                  <button onClick={() => setIsViewButtonClicked(false)}>
                    <Icon
                      icon="mdi:multiply"
                      style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
                    />
                  </button>
                </div>
                <div>
                  {orderDetails.order_items.map((item) => {
                    return (
                      <div className="payment-info" key={item.product_id}>
                        <span style={{color : "rgb(97, 94, 94)", fontSize: "15px"}}>
                          {item.quantity} x {item.product_name.length > 30 ? `${item.product_name.substring(0, 30)}...` : item.product_name }
                        </span>
                        <strong>${item.total_price_per_item}</strong>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div className="payment-info">
                    <strong>Tax (6%)</strong>
                    <strong>${(orderDetails.total_price_without_tax * 0.06).toFixed(2)}</strong>
                </div>
                <hr />
                <div className="payment-info">
                    <strong>Total Paid</strong>
                    <strong>${(orderDetails.total_order_price)}</strong>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
