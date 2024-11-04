import dotenv from "dotenv";
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();
const poolConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    max: 10,
    idleTimeoutMillis: 30000
};
const pool = new Pool(poolConfig);

export default pool;

