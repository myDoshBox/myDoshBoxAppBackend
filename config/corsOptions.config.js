import allowedOrigins from "./allowedOrigins.config.js";

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("not allowed by CORS"));
		}
	},

	credentials: true,
	// headers: {
	// 	Accept: "application/json",
	// 	"Content-Type": "application/json",
	// },
	optionSuccessStatus: 200,
};

export default corsOptions;
