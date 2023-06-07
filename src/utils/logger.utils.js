const getTimeStamp = () => {
	return new Date().toLocaleString();
};

const info = (namespace, message, object) => {
	if (object) {
		console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
	} else {
		console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
	}
};

/**
how to use the above
const NAMESPACE = 'SERVER'
logger.info(NAMESPACE, 'METHOD' - [${req.method}], URL - [${req.url}], IP - [${req.socket.remote}])


 */

const warn = (namespace, message, object) => {
	if (object) {
		console.log(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
	} else {
		console.log(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
	}
};

const error = (namespace, message, object) => {
	if (object) {
		console.log(
			`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
			object
		);
	} else {
		console.log(
			`$[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
			object
		);
	}
};

const debug = (namespace, message, object) => {
	if (object) {
		console.log(
			`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
			object
		);
	} else {
		console.log(
			`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
			object
		);
	}
};

export default { info, warn, error, debug };
