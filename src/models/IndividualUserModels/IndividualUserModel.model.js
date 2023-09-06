import mongoose from "mongoose";

//  * "email": "kor@gmail.com",
//  * "phonenum": "1232455",
//  * "confirmpass": "1234",
//  * "username": "jane doe",
//  * "fullname": "Ada Jones"
// 	* "roles": "individualusers"
// 		*
export const UserSchema = new mongoose.Schema(
	{
		user_email: {
			type: String,
			required: true,
			// required: [true, "Please provide unique email"],
			// unique: [true, "email already exists"],
			unique: true,
		},

		user_phone_num: {
			type: String,
			required: true,
			// required: [true, "Please provide unique phone number"],
			// unique: [true, "phone number already exists"],
			unique: true,
		},

		user_password: {
			type: String,
			// required: [true, "Please provide your password"],
			required: true,
			unique: false,
		},

		full_name: {
			type: String,
			required: false,
		},

		user_name: {
			type: String,
			required: false,
		},

		// roles: [
		// 	{
		// 		type: String,
		// 		default: "individualuser",
		// 	},
		// ],

		verified: {
			type: Boolean,
			default: false,
		},
	},

	{
		timestamps: true,
	}
);

export default mongoose.model("User", UserSchema);
