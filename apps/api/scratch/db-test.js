import { pool } from '../src/db/pool.js';

const { rows } = await pool.query('SELECT NOW()');
console.log(rows[0]);
await pool.end();