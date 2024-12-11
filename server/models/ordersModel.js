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