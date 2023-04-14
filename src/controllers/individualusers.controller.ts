import { Request, Response } from "express";
import { IndividualUsers } from "../Interface/Individualusers";
import logger from "../util/logger";
import { dbconnection } from "../config/mysql.config";
import { QUERYINDIVIDUALUSERS } from "../Query/individualusers.query";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from "mysql2";

type ResultSet = [
	RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader,
	FieldPacket[]
];

export const getAllIndividualUsers = async (
	req: Request,
	res: Response
	// ): Promise<Response<IndividualUsers[]>> => {
): Promise<Response<HttpResponse>> => {
	logger.info(
		`[${new Date().toLocaleString()}] Incoming ${req.method}${
			req.originalUrl
		} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
	);

	try {
		const pool = await dbconnection();
		const result: ResultSet = await pool.query(
			QUERYINDIVIDUALUSERS.SELECT_INDIVIDUALUSERS
		);
		return res
			.status(Code.OK)
			.send(new HttpResponse(Code.OK, Status.OK, "Users Retrieved", result[0]));
	} catch (error: unknown) {
		logger.info(error);
		return res
			.status(Code.INTERNAL_SERVER_ERROR)
			.send(
				new HttpResponse(
					Code.INTERNAL_SERVER_ERROR,
					Status.INTERNAL_SERVER_ERROR,
					"Users not Retrieved"
				)
			);
	}
};

export const getOneIndividualUser = async (
	req: Request,
	res: Response
	// ): Promise<Response<IndividualUsers>> => {
): Promise<Response<HttpResponse>> => {
	logger.info(
		`[${new Date().toLocaleString()}] Incoming ${req.method}${
			req.originalUrl
		} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
	);

	try {
		const pool = await dbconnection();
		const result: ResultSet = await pool.query(
			QUERYINDIVIDUALUSERS.SELECT_INDIVIDUALUSER,
			[req.params.induser_id]
		);

		if ((result[0] as Array<ResultSet>).length > 0) {
			return res
				.status(Code.OK)
				.send(
					new HttpResponse(Code.OK, Status.OK, "User Retrieved", result[0])
				);
		} else {
			return res
				.status(Code.NOT_FOUND)
				.send(
					new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User Not Found")
				);
		}
	} catch (error: unknown) {
		logger.info(error);
		return res
			.status(Code.INTERNAL_SERVER_ERROR)
			.send(
				new HttpResponse(
					Code.INTERNAL_SERVER_ERROR,
					Status.INTERNAL_SERVER_ERROR,
					"User not Found"
				)
			);
	}
};

// export const CreateIndividualUser = async (
// 	req: Request,
// 	res: Response
// ): Promise<Response<IndividualUsers>> => {
// 	logger.info(
// 		`[${new Date().toLocaleString()}] Incoming ${req.method}${
// 			req.originalUrl
// 		} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
// 	);

// 	let individualuser: IndividualUsers = { ...req.body };

// 	// let individualuser = [
// 	// 	req.body.username,
// 	// 	req.body.email,
// 	// 	req.body.user_password,
// 	// ];

// 	try {
// 		const pool = await dbconnection();
// 		const result: ResultSet = await pool.query(
// 			QUERYINDIVIDUALUSERS.CREATE_INDIVIDUALUSER,

// 			// QUERYINDIVIDUALUSERS.CREATE_INDIVIDUALUSER_SPROCEDURE,

// 			Object.values(individualuser)
// 			// individualuser
// 			// Object.values(req.body)
// 		);

// 		individualuser = {
// 			id: (result[0] as ResultSetHeader).insertId,
// 			...req.body,
// 		};

// 		// individualuser = {
// 		// 	id: result[0],
// 		// 	...req.body,
// 		// };

// 		// const individualuser = result[0][0]

// 		return res
// 			.status(Code.CREATED)
// 			.send(
// 				new HttpResponse(
// 					Code.CREATED,
// 					Status.CREATED,
// 					"User Created",
// 					individualuser
// 				)
// 			);
// 	} catch (error: unknown) {
// 		logger.info(error);
// 		return res
// 			.status(Code.INTERNAL_SERVER_ERROR)
// 			.send(
// 				new HttpResponse(
// 					Code.INTERNAL_SERVER_ERROR,
// 					Status.INTERNAL_SERVER_ERROR,
// 					"User not Created"
// 				)
// 			);
// 	}
// };

export const createIndividualUser = async (
	req: Request,
	res: Response
	// ): Promise<Response<IndividualUsers>> => {
): Promise<Response<HttpResponse>> => {
	logger.info(
		`[${new Date().toLocaleString()}] Incoming ${req.method}${
			req.originalUrl
		} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
	);

	let individualuser: IndividualUsers = { ...req.body };

	// const username = req.body.username;
	// const email = req.body.email;
	// const user_password = req.body.user_password;

	// let individualuser = [username, email, user_password];

	try {
		const pool = await dbconnection();
		const result: ResultSet = await pool.query(
			// QUERYINDIVIDUALUSERS.CREATE_INDIVIDUALUSER,
			QUERYINDIVIDUALUSERS.CREATE_INDIVIDUALUSER,
			Object.values(individualuser)
			// individualuser
		);

		// individualuser = {
		// 	id: (result[0] as ResultSetHeader).insertId,
		// 	...req.body,
		// };

		// the code below is for calling stored procedure to create users
		individualuser = { id: result[0], ...req.body };

		return res
			.status(Code.CREATED)
			.send(
				new HttpResponse(
					Code.CREATED,
					Status.CREATED,
					"User Created",
					individualuser
				)
			);
	} catch (error: unknown) {
		logger.info(error);
		return res
			.status(Code.INTERNAL_SERVER_ERROR)
			.send(
				new HttpResponse(
					Code.INTERNAL_SERVER_ERROR,
					Status.INTERNAL_SERVER_ERROR,
					"User not Created"
				)
			);
	}
};

// export const updateOneIndividualUser = async (
// 	req: Request,
// 	res: Response
// ): Promise<Response<IndividualUsers>> => {
// 	logger.info(
// 		`[${new Date().toLocaleString()}] Incoming ${req.method}${
// 			req.originalUrl
// 		} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
// 	);

// 	let individualuser: IndividualUsers = { ...req.body };
// 	try {
// 		const pool = await dbconnection();
// 		const result: ResultSet = await pool.query(
// 			QUERYINDIVIDUALUSERS.SELECT_INDIVIDUALUSER,
// 			[req.params.id]
// 		);

// 		if ((result[0] as Array<ResultSet>).length > 0) {
// 			const result: ResultSet = await pool.query(
// 				QUERYINDIVIDUALUSERS.UPDATE_INDIVIDUALUSER,
// 				[...Object.values(individualuser), req.params.id]
// 			);
// 			return res.status(Code.OK).send(
// 				new HttpResponse(Code.OK, Status.OK, "User Updated", {
// 					...individualuser,
// 					id: req.params.id,
// 				})
// 			);
// 		} else {
// 			return res
// 				.status(Code.NOT_FOUND)
// 				.send(
// 					new HttpResponse(
// 						Code.NOT_FOUND,
// 						Status.NOT_FOUND,
// 						"User Not Found",
// 						result[0]
// 					)
// 				);
// 		}
// 	} catch (error: unknown) {
// 		logger.info(error);
// 		return res
// 			.status(Code.INTERNAL_SERVER_ERROR)
// 			.send(
// 				new HttpResponse(
// 					Code.INTERNAL_SERVER_ERROR,
// 					Status.INTERNAL_SERVER_ERROR,
// 					"User not Found"
// 				)
// 			);
// 	}
// };

export const updateOneIndividualUser = async (
	req: Request,
	res: Response
	// ): Promise<Response<IndividualUsers>> => {
): Promise<Response<HttpResponse>> => {
	logger.info(
		`[${new Date().toLocaleString()}] Incoming ${req.method}${
			req.originalUrl
		} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
	);

	let individualuser: IndividualUsers = { ...req.body };

	try {
		const pool = await dbconnection();
		const result: ResultSet = await pool.query(
			QUERYINDIVIDUALUSERS.SELECT_INDIVIDUALUSER,
			[req.params.induser_id]
		);

		if ((result[0] as Array<ResultSet>).length > 0) {
			const result: ResultSet = await pool.query(
				QUERYINDIVIDUALUSERS.UPDATE_INDIVIDUALUSER,
				[...Object.values(individualuser), req.params.induser_id]
			);
			return res.status(Code.OK).send(
				new HttpResponse(Code.OK, Status.OK, "User Updated", {
					...individualuser,
					id: req.params.induser_id,
				})
			);
		} else {
			return res
				.status(Code.NOT_FOUND)
				.send(
					new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User Not Found")
				);
		}
	} catch (error: unknown) {
		logger.info(error);
		return res
			.status(Code.INTERNAL_SERVER_ERROR)
			.send(
				new HttpResponse(
					Code.INTERNAL_SERVER_ERROR,
					Status.INTERNAL_SERVER_ERROR,
					"User not Found"
				)
			);
	}
};

export const deleteOneIndividualUser = async (
	req: Request,
	res: Response
	// ): Promise<Response<IndividualUsers>> => {
): Promise<Response<HttpResponse>> => {
	logger.info(
		`[${new Date().toLocaleString()}] Incoming ${req.method}${
			req.originalUrl
		} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
	);

	try {
		const pool = await dbconnection();
		const result: ResultSet = await pool.query(
			QUERYINDIVIDUALUSERS.SELECT_INDIVIDUALUSER,
			[req.params.induser_id]
		);

		if ((result[0] as Array<ResultSet>).length > 0) {
			const result: ResultSet = await pool.query(
				QUERYINDIVIDUALUSERS.DELETE_INDIVIDUALUSER,
				[req.params.induser_id]
			);
			return res
				.status(Code.OK)
				.send(new HttpResponse(Code.OK, Status.OK, "User Deleted"));
		} else {
			return res
				.status(Code.NOT_FOUND)
				.send(
					new HttpResponse(
						Code.NOT_FOUND,
						Status.NOT_FOUND,
						"User Not Found",
						result[0]
					)
				);
		}
	} catch (error: unknown) {
		logger.info(error);
		return res
			.status(Code.INTERNAL_SERVER_ERROR)
			.send(
				new HttpResponse(
					Code.INTERNAL_SERVER_ERROR,
					Status.INTERNAL_SERVER_ERROR,
					"User not Found"
				)
			);
	}
};
