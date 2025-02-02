import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables from .env file
dotenv.config();

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5433,
});

// Function to connect to the database
const connectToDb = async (): Promise<void> => {
  try {
    await pool.connect();
    console.log('Connected to the database successfully.');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
};

// Export the pool and connect function for use in other modules
export { pool, connectToDb };
