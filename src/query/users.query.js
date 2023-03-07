export const queryIndividualUsers = {
	SELECT_USERS:
		"SELECT * FROM individual_users_table ORDER BY date_joined DESC LIMIT 100",
	SELECT_USER:
		"SELECT * FROM individual_users_table WHERE individual_user_id = ?",
	CREATE_USER:
		"INSERT INTO individual_users_table(user_email, user_phone, user_password) VALUES(?, ?, ?)",
	// rework update_user since you want to get other details like first name, last name, username, etc.
	UPDATE_USER:
		"UPDATE individual_users_table SET user_email = ?, user_phone = ?, user_password = ? WHERE individual_user_id = ?",
	DELETE_USER:
		"DELETE FROM individual_users_table WHERE individual_user_id = ?",
};

const queryOrganizationUsers = {};

const queryCustomerCare = {};

const queryAdminUsers = {};
