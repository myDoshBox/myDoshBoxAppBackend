export const localVariables = (req, res, next) => {
	req.app.locals = {
		OTP: null,
		resetSession: false,
	};

	next();
};
