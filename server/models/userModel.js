import pool from '../config/db.js';

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
    return rows[0];
}

export const createUser = async (userName, email, hashedPassword) => {
    const { rows } = await pool.query("INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3)", [
        userName,
        email,
        hashedPassword,
    ]);
    return rows;
}

export const getUserById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
    return rows[0];
}