import pool from "../config/db.js"

export const getCartByUserId = async (userId) => {
    const { rows } = await pool.query("SELECT * FROM cart WHERE user_id=$1 ORDER BY id ASC", [userId]);
    return rows;
}

export const getCartByUserAndProductId = async (userId, productId) => {
    const { rows } = await pool.query("SELECT * FROM cart WHERE (user_id, product_id) = ($1, $2)", [userId, productId]);
    return rows[0];
}

export const addProductToCart = async (userId, productId, quantity) => {
    const { rows } = await pool.query("INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *", [userId, productId, quantity]);
    return rows;
}

export const updateCart = async (quantity, userId, productId) => {
    const { rows } = await pool.query("UPDATE cart SET quantity=$1 WHERE user_id=$2 AND product_id=$3", [quantity, userId, productId]);
    return rows;
}

export const deleteItemFromCart = async (userId, productId) => {
    const { rows } = await pool.query("DELETE FROM cart WHERE user_id=$1 AND product_id=$2 RETURNING *", [userId, productId]);
    return rows;
}

export const deleteAllById = async (userId) => {
    const { rows } = await pool.query("DELETE FROM cart WHERE user_id=$1 RETURNING *", [userId]);
    return rows;
}