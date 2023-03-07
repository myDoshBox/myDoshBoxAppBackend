import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const dbconnection = mysql.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connection_limit: process.env.DB_CONNECTION_LIMIT,
});

export default dbconnection;
