import pool from '../config/db.js';

export const getProductsByCategoryId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM products WHERE category_id=$1 ORDER BY id ASC", [id]);
    return rows;
}

export const getProductById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
    return rows;
}
