import pool from '../config/db.js';

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
    return rows[0];
}

export const createUser = async (email, hashedPassword) => {
    const { rows } = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
        email,
        hashedPassword,
    ]);
    return rows;
}