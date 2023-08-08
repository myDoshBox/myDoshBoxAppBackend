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

		user_password: {
			type: String,
			required: true,
		},

		user_name: {
			type: String,
			required: false,
		},

		user_phone_num: {
			type: String,
			required: true,
		},

		roles: [
			{
				type: String,
				default: "individualuser",
			},
		],

		active: {
			type: Boolean,
			required: true,
		},
	},

	{
		timestamps: true,
	}
);

transactionSchema.plugin(AutoIncrement, {
	inc_field: "ticket",
	id: "ticketNums",
	start_seq: 1000,
});

module.exports = mongoose.model("User", UserSchema);
