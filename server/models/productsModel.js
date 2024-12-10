import pool from '../config/db.js';

export const getProductsByCategoryId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM products WHERE category_id=$1 ORDER BY id ASC", [id]);
    return rows;
}

export const getProductById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
    return rows;
}

export const updateStockById = async (client, quantity, id) => {
    const { rows } = await client.query("UPDATE products SET stock= stock-$1 WHERE id=$2 AND stock >= $1 RETURNING *", [quantity, id]);
    return rows;
}
