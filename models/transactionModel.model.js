const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},

		transaction_action: {
			type: String,
			required: true,
		},

		transaction_charge: {
			type: String,
			required: true,
		},

		// image: {
		// 	type: Image,
		// 	required: false,
		// },

		transaction_description: {
			type: String,
			required: true,
		},

		transaction_status: {
			type: Boolean,
			required: true,
		},
	},

	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Transaction", transactionSchema);
