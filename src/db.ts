// Importing the 'pg' module for database interaction
import { Client } from 'pg';

// Define configuration for the PostgreSQL client
const clientConfig = {
    host: 'localhost',           // Database host
    port: 5433,                  // Database port
    user: process.env.DB_USER,   // Database user from environment variables
    password: process.env.DB_PASSWORD,  // Database password from environment variables
    database: process.env.DB_NAME // Database name from environment variables
};

// Creating a client instance with the configuration
const db = new Client(clientConfig);

// Handling the connection asynchronously
async function connectToDatabase() {
    try {
        await db.connect();  // Attempting to connect to the database
    } catch (err) {
        console.error('Error connecting to the database:', err);  // Logging error if connection fails
    }
}

// Calling the connection function
connectToDatabase();

// Exporting the db client for use in other modules
export default db;
