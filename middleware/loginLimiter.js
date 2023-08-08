import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 5, // limit each IP to 5 login per 'window' per minute
	message: {
		message:
			"Too many login attempts from this IP, please try again after 60 seconds",
	},
	handler: (req, res, next, options) => {
		// logEvents(
		// 	`Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
		// 	"errLog.log"
		// );

		console.log(
			`Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
		);
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // disable the `X-RateLimit-*` headers
});
