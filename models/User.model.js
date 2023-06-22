const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: false,
		},

		user_email: {
			type: String,
			required: true,
		},

		user_phone_num: {
			type: String,
			required: true,
		},

		user_password: {
			type: String,
			required: true,
		},

		user_name: {
			type: String,
			required: false,
		},

		roles: [
			{
				type: String,
				default: "individualuser",
			},
		],

		active: {
			type: Boolean,
			default: true,
		},
	},

	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", UserSchema);
