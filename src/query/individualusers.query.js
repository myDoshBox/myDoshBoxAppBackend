export const INDIVIDUALUSERQUERY = {
	SELECT_ALLINDIVIDUALUSERS:
		"SELECT * FROM individual_users_table ORDER BY date_joined DESC LIMIT 50",

	SELECT_INDIVIDUALUSER_BY_EMAIL:
		"SELECT * FROM individual_users_table where user_email = ?",

	SELECT_INDIVIDUALUSER_BY_ID:
		"SELECT * FROM individual_users_table where individual_user_id = ?",

	CREATE_INDIVIDUALUSER:
		"INSERT INTO individual_users_table(user_category_id, user_email, user_password, user_phone_num) VALUES (?, ?, ?, ?)",

	// stored procedures
	CREATE_INDIVIDUALUSER_PROCEDURE: "CALL create_and_return_induser(?, ?, ?, ?)",

	UPDATE_INDIVIDUALUSER:
		"UPDATE individual_users_table SET first_name = ?, middle_name = ?, last_name = ?, user_email = ?, user_password = ?, user_name = ?, user_phone_num = ? WHERE individual_user_id = ?",
	DELETE_INDIVIDUALUSER:
		"DELETE FROM individual_users_table WHERE individual_user_id = ?",
};
