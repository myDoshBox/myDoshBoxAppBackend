// import mongoose, { Schema } from "mongoose";

// //  * "email": "kor@gmail.com",
// //  * "phonenum": "1232455",
// //  * "confirmpass": "1234",
// //  * "username": "jane doe",
// //  * "fullname": "Ada Jones"
// // 	* "roles": "individualusers"
// // 		*
// export const UserVerificationSchema = new mongoose.Schema({
// 	user_id: {
// 		type: String,
// 		// unique: true,
// 	},

// 	unique_string: {
// 		type: String,
// 		unique: true,
// 	},

// 	createdAt: {
// 		type: Date,
// 	},

// 	expiresAt: {
// 		type: Date,
// 	},
// });

// export default mongoose.model("UserVerificationModel", UserVerificationSchema);

import mongoose, { Schema } from "mongoose";

//  * "email": "kor@gmail.com",
//  * "phonenum": "1232455",
//  * "confirmpass": "1234",
//  * "username": "jane doe",
//  * "fullname": "Ada Jones"
// 	* "roles": "individualusers"
// 		*
export const UserVerificationSchema = new mongoose.Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
		unique: true,
	},

	token: {
		type: String,
		required: true,
		unique: true,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 3600, // 1hr
	},

	// expiresAt: {
	// 	type: Date,
	// },
});

export default mongoose.model("UserVerificationModel", UserVerificationSchema);
