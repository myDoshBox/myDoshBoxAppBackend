// database.js

import { createPool } from "mysql2/promise";

class Database {
	constructor() {
		this.pool = createPool({
			host: "your_mysql_host",
			user: "your_mysql_user",
			password: "your_mysql_password",
			database: "your_mysql_database",
		});
	}

	async executeQuery(sql, params) {
		const connection = await this.pool.getConnection();
		try {
			const [results] = await connection.query(sql, params);
			return results;
		} catch (error) {
			throw error;
		} finally {
			connection.release();
		}
	}
}

export default new Database();
