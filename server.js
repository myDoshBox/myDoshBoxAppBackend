require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { logger, logEvents } = require("./middleware/logger.model");
const errorHandler = require("./middleware/errorHandler.middleware");
const corsOptions = require("./config/corsOptions.model");
const connectDB = require("./config/dbconn.config");
const mongoose = require("mongoose");

// console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
// app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root.route"));
app.use("/users", require("./routes/userRoutes.route"));

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ message: "Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("connected to mongoose");
	app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
});

mongoose.connection.on("error", (err) => {
	console.log(err);
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		"mongoErrLog.log"
	);
});
