export const INDIVIDUALUSERQUERY = {
	SELECT_ALLINDIVIDUALUSERS:
		"SELECT * FROM individual_users_table ORDER BY date_joined DESC LIMIT 50",

	SELECT_INDIVIDUALUSER_BY_EMAIL: "SELECT * FROM users where email = ?",

	SELECT_INDIVIDUALUSER_BY_ID: "SELECT * FROM users where id = ?",

	CREATE_INDIVIDUALUSER:
		"INSERT INTO users(name, email, password) VALUES (?, ?, ?)",

	// stored procedures
	CREATE_INDIVIDUALUSER_PROCEDURE: "CALL create_and_return_induser(?, ?, ?, ?)",

	UPDATE_INDIVIDUALUSER:
		"UPDATE individual_users_table SET first_name = ?, middle_name = ?, last_name = ?, user_email = ?, user_password = ?, user_name = ?, user_phone_num = ? WHERE individual_user_id = ?",

	UPDATE_INDIVIDUALUSER_TOKEN: "UPDATE users SET token = ? WHERE email = ?",

	UPDATE_INDIVIDUALUSER_PASSWORD:
		"UPDATE users SET password = ? WHERE email = ?",

	DELETE_INDIVIDUALUSER:
		"DELETE FROM individual_users_table WHERE individual_user_id = ?",
};
