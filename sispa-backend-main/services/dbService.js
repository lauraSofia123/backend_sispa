import pool from '../config/db.js';

export const executeQuery = async (query, params = []) => {
  const [rows] = await pool.execute(query, params);
  return rows;
};
