import { Router } from "express";
import {
	createIndividualUser,
	deleteOneIndividualUser,
	getAllIndividualUsers,
	getOneIndividualUser,
	updateOneIndividualUser,
} from "../controllers/individualusers.controller";

const individualusersRoutes = Router();

individualusersRoutes
	.route("/")
	.get(getAllIndividualUsers)
	.post(createIndividualUser);

individualusersRoutes
	.route("/:induser_id")
	.get(getOneIndividualUser)
	.put(updateOneIndividualUser)
	.delete(deleteOneIndividualUser);

export default individualusersRoutes;
