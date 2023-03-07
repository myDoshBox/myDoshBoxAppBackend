import dbconnection from "../config/mysql.config.js";
import Response from "../domain/response.js";
import log from "../util/logger.js";
import { queryIndividualUsers } from "../query/users.query.js";

export const HttpStatus = {
	OK: { code: 200, status: "ok" },
	CREATED: { code: 201, status: "CREATED" },
	NO_CONTENT: { code: 204, status: "NO CONTENT" },
	BAD_REQUEST: { code: 200, status: "BAD REQUEST" },
	NOT_FOUND: { code: 404, status: "NOT FOUND" },
	INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL SERVER ERROR" },
};

export const getAllIndividualUsers = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, fetching individual users`);
	dbconnection.query(queryIndividualUsers.SELECT_USERS, (err, result) => {
		if (!result) {
			res
				.status(HttpStatus.OK.code)
				.send(
					new Response(
						HttpStatus.OK.code,
						HttpStatus.OK.status,
						`No Users Found`
					)
				);
		} else {
			res
				.status(HttpStatus.OK.code)
				.send(
					new Response(
						HttpStatus.OK.code,
						HttpStatus.OK.status,
						`Users Retrieved`,
						{ individual_users: result }
					)
				);
		}
	});
};

export const createSingleIndividualUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, Creating User`);
	dbconnection.query(
		queryIndividualUsers.CREATE_USER,
		Object.values(req.body),
		(err, result) => {
			if (!result) {
				log.error(error.message); // this code might not work
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
					.send(
						new Response(
							HttpStatus.INTERNAL_SERVER_ERROR.code,
							HttpStatus.INTERNAL_SERVER_ERROR.status,
							`Error Occured while Creating User`
						)
					);
			} else {
				const individual_user = {
					id: result.inserted_Id,
					...req.body,
					created_at: new Date(),
				}; // this will be updated later
				res
					.status(HttpStatus.CREATED.code)
					.send(
						new Response(
							HttpStatus.CREATED.code,
							HttpStatus.CREATED.status,
							`User Created`,
							{ individual_user }
						)
					);
			}
		}
	);
};

export const fetchSingleIndividualUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, Fetching a User`);
	dbconnection.query(
		queryIndividualUsers.SELECT_USER,
		[req.params.individual_user_id],
		(err, result) => {
			if (!result[0]) {
				res
					.status(HttpStatus.NOT_FOUND.code)
					.send(
						new Response(
							HttpStatus.NOT_FOUND.code,
							HttpStatus.NOT_FOUND.status,
							`User with ${req.params.individual_user_id} was not found`
						)
					);
			} else {
				res
					.status(HttpStatus.OK.code)
					.send(
						new Response(
							HttpStatus.OK.code,
							HttpStatus.OK.status,
							`User Retrieved`,
							result[0]
						)
					);
			}
		}
	);
};

export const updateIndividualUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, Fetching a Single User`);
	dbconnection.query(
		queryIndividualUsers.UPDATE_USER,
		[req.params.individual_user_id],
		(err, result) => {
			if (!result[0]) {
				log.error(error.message); // this code might not work
				res
					.status(HttpStatus.NOT_FOUND.code)
					.send(
						new Response(
							HttpStatus.NOT_FOUND.code,
							HttpStatus.NOT_FOUND.status,
							`User with ${req.params.individual_user_id} was not found`
						)
					);
			} else {
				log.info(`${req.method} ${req.originalUrl}, Updating User`);
				dbconnection.query(
					queryIndividualUsers.UPDATE_USER,
					[...Object.values(req.body), req.params.individual_user_id],
					(err, result) => {
						if (!err) {
							res
								.status(HttpStatus.OK.code)
								.send(
									new Response(
										HttpStatus.OK.code,
										HttpStatus.OK.status,
										`User Updated`,
										{ id: req.params.id, ...req.body }
									)
								);
						} else {
							log.error(error.message);
							res
								.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
								.send(
									new Response(
										HttpStatus.INTERNAL_SERVER_ERROR.code,
										HttpStatus.INTERNAL_SERVER_ERROR.status,
										`Error Occurred during update`
									)
								);
						}
					}
				);
			}
		}
	);
};

export const deleteIndividualUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, Deleting User`);
	dbconnection.query(
		queryIndividualUsers.DELETE_USER,
		[req.params.individual_user_id],
		(err, result) => {
			if (result.affectedRows > 0) {
				res
					.status(HttpStatus.OK.code)
					.send(
						new Response(
							HttpStatus.OK.code,
							HttpStatus.OK.status,
							`User Deleted`,
							result[0]
						)
					);
			} else {
				res
					.status(HttpStatus.NOT_FOUND.code)
					.send(
						new Response(
							HttpStatus.NOT_FOUND.code,
							HttpStatus.NOT_FOUND.status,
							`User with ${req.params.individual_user_id} was not found`
						)
					);
			}
		}
	);
};
