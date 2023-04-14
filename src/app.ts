import express, { Application, Request, Response } from "express";
import ip from "ip";
import cors from "cors";
import { Code } from "./enum/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enum/status.enum";
import individualusersRoutes from "./routes/individualusers.routes";
import logger from "./util/logger";

export class App {
	private readonly app: Application;
	private readonly APPLICATION_RUNNING = "application is running on:";
	private readonly ROUTE_NOT_FOUND = "This route does not exist";

	constructor(
		private readonly port: string | number = process.env.SERVER_PORT || 3002
	) {
		this.app = express();
		this.middleware();
		this.routes();
	}

	listen(): void {
		this.app.listen(this.port);
		logger.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
	}

	private middleware(): void {
		this.app.use(cors());
		this.app.use(express.json());
	}

	private routes(): void {
		this.app.use("/individualuser", individualusersRoutes);
		this.app.get("/", (req: Request, res: Response) =>
			res
				.status(Code.OK)
				.send(
					new HttpResponse(Code.OK, Status.OK, "Welcome to Doshbox API v1.0.0")
				)
		);

		this.app.all("*", (req: Request, res: Response) =>
			res
				.status(Code.NOT_FOUND)
				.send(
					new HttpResponse(
						Code.NOT_FOUND,
						Status.NOT_FOUND,
						this.ROUTE_NOT_FOUND
					)
				)
		);
	}
}
