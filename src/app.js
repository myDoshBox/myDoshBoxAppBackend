import express from "express";
import logger from "./utils/logger.utils.js";
import ip from "ip";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { HttpResponse } from "./domain/response.domain.js";
import { httpStatus } from "./domain/httpStatus.domain.js";
import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/userRoutes";

dotenv.config();

export class App {
	app;
	NAMESPACE = "SERVER";
	ROUTE_NOT_FOUND = "route does not exist on the server";
	APPLICATION_RUNNING = "Application is running on:";

	constructor() {
		this.port = process.env.SERVER_PORT || 5000;
		this.app = express();
		this.middleware();
		this.routes();
	}

	listen() {
		this.app.listen(this.port);
		// console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
		logger.info(
			this.NAMESPACE,
			`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`
		);
	}

	middleware() {
		this.app.use(cors());
		this.app.use(
			session({
				secret: "process.env.SESSION_SECRET",
				resave: false,
				saveUninitialized: true,
			})
		);
		this.app.use(express.json());
		// this.app.use(cookieParser());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use((req, res, next) => {
			logger.info(
				this.NAMESPACE,
				`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
			);

			res.on("finish", () => {
				logger.info(
					this.NAMESPACE,
					`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - ${res.statusCode}, STATUSMSG - ${res.statusMessage}`
				);
			});

			next();
		});
	}

	routes() {
		this.app.use(`/individualusers`, (req, res) => {});
		this.app.use(`/authindividualusers`, (req, res) => {});
		this.app.use("/auth", authRoutes);
		// app.use("/users", userRoutes);
		this.app.get(`/`, (_req, res) =>
			res.send(
				new HttpResponse(
					httpStatus.OK.code,
					httpStatus.OK.status,
					"Welcome to DoshBox API v1.0"
				)
			)
		);

		this.app.use(`*`, (_req, res) => {
			res.send(
				new HttpResponse(
					httpStatus.NOT_FOUND.code,
					httpStatus.NOT_FOUND.status,
					`${this.ROUTE_NOT_FOUND}`
				)
			);
		});
	}
}
