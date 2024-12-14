import pool from '../config/db.js';

export const insertOrderDetails = async (client, userId, total_price) => {
    const { rows } = await client.query("INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id", [userId, total_price]);
    return rows;
}

export const insertAllOrderedItems = async (client, orderId, productId, quantity, price) => {
    const { rows } = await client.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *", [orderId, productId, quantity, price]);
    return rows;
}

export const getOrdersByUserId = async (userId) => {
    const { rows } = await pool.query("SELECT * FROM orders WHERE user_id=$1 ORDER BY id DESC", [userId]);
    return rows;
}

export const getTotalItemsByOrderId = async (orderId) => {
    const { rows } = await pool.query("SELECT SUM(quantity) AS total_quantity FROM order_items WHERE order_id=$1", [orderId]);
    return rows[0]?.total_quantity || 0;
}

export const getOrderDetailsByOrderIdAndUserId = async (id, userId) => {
    const { rows } = await pool.query("SELECT orders.id AS order_id, orders.created_at AS order_date, orders.total_price AS total_order_price, SUM(order_items.quantity * order_items.price) AS total_price_without_tax FROM orders JOIN order_items ON orders.id = order_items.order_id WHERE orders.id=$1 AND orders.user_id=$2 GROUP BY orders.id, orders.created_at, orders.total_price", [id, userId]);
    return rows[0];
}

export const getOrderItemsByOrderId = async (id) => {
    const { rows } = await pool.query(
        "SELECT order_items.product_id, products.name AS product_name, products.image_url AS product_image, order_items.quantity, order_items.price, (order_items.quantity * order_items.price) AS total_price_per_item FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id=$1", [id]);
    return rows;
}