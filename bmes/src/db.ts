import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres', //default
  host: 'localhost', //default
  database: '????',  //Enter your own database name
  password: '????',  //Enter your own database password
  port: 5432, //default
});

pool.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to PostgreSQL');
  }
});
