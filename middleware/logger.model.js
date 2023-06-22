const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
	const dataTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
	const logItem = `${dataTime}\t${uuid}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
		}

		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logFileName),
			logItem
		);
	} catch (error) {
		throw new Error(error);
	}
};

const logger = (req, res, next) => {
	logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, `reqLog.log`);
	// conditions for when logs can be written here
	console.log(`${req.method} ${req.path}`);
	next();
};

module.exports = { logEvents, logger };
