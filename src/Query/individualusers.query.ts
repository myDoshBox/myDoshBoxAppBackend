// import logger from "../util/logger";

// export const QUERYINDIVIDUALUSERS = {
// 	SELECT_INDIVIDUALUSERS:
// 		"SELECT * FROM users_info ORDER BY created_at DESC LIMIT 50",
// 	SELECT_INDIVIDUALUSER: "SELECT * FROM users_info WHERE user_id = ?",
// 	CREATE_INDIVIDUALUSER:
// 		"INSERT INTO `users_info` (`username`, `email`, `user_password`) VALUES (?, ?, ?)",
// 	CREATE_INDIVIDUALUSER_SPROCEDURE: `CALL user_procedure(?, ?, ?)`,
// 	UPDATE_INDIVIDUALUSER:
// 		"UPDATE `users_info` SET `username` = ?, `email` = ?, `user_password` = ? WHERE user_id = ?",
// 	// UPDATE_INDIVIDUALUSER: "UPDATE users SET ? WHERE user_id = ?",
// 	DELETE_INDIVIDUALUSER: "DELETE FROM users_info WHERE user_id = ?",
// };

// test queries:
// export const QUERYINDIVIDUALUSERS = {
// 	SELECT_INDIVIDUALUSERS:
// 		"SELECT * FROM users_info ORDER BY created_at DESC LIMIT 50",

// 	SELECT_INDIVIDUALUSER: "SELECT * FROM users_info WHERE user_id = ?",

// 	CREATE_INDIVIDUALUSER:
// 		"INSERT INTO users_info (username, email, user_password) VALUES (?, ?, ?)",

// 	CREATE_INDIVIDUALUSER_SPROCEDURE: `CALL user_procedure(?, ?, ?)`,

// 	UPDATE_INDIVIDUALUSER:
// 		"UPDATE users_info SET username=?, email=?, user_password=? WHERE user_id=?",

// 	// UPDATE_INDIVIDUALUSER_SPROCEDURE: `CALL update_user_procedure(?, ?, ?)`,

// 	DELETE_INDIVIDUALUSER: "DELETE FROM users_info WHERE user_id = ?",
// };

// original queries:
export const QUERYINDIVIDUALUSERS = {
	SELECT_INDIVIDUALUSERS:
		"SELECT * FROM individual_users_table ORDER BY date_joined DESC LIMIT 50",

	SELECT_INDIVIDUALUSER:
		"SELECT * FROM individual_users_table WHERE individual_user_id = ?",

	CREATE_INDIVIDUALUSER:
		"INSERT INTO individual_users_table (user_category_id, user_email, user_password, user_phone_num) VALUES (?, ?, ?, ?)",

	CREATE_INDIVIDUALUSER_SPROCEDURE: `CALL user_procedure(?, ?, ?)`,

	UPDATE_INDIVIDUALUSER:
		"UPDATE individual_users_table SET first_name=?, middle_name=?, last_name=?, user_email=?, user_password=?, user_name=?, user_phone_num=? WHERE individual_user_id=?",

	// UPDATE_INDIVIDUALUSER_SPROCEDURE: `CALL update_user_procedure(?, ?, ?)`,

	DELETE_INDIVIDUALUSER:
		"DELETE FROM individual_users_table WHERE individual_user_id = ?",
};
