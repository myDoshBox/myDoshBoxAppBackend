import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./domain/response.js";
import { HttpStatus } from "./controller/individualusers.controllers.js";
import log from "./util/logger.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3001;
const app = express();
app.use(cors());
// or bad practice
// app.use(cors({origin: '*'}))
app.use(express.json());

app.get("/", (req, res) => {
	res.send(
		new Response(HttpStatus.OK.code, HttpStatus.OK.status, "doshbox api v1.0.0")
	);
});

// console.log(process.env);
app.listen(PORT, () => {
	log.info(`app listening on port ${ip.address()}:${PORT}`);
});
