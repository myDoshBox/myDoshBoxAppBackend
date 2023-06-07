// config.js

module.exports = {
	// mysql: {
	//   host: 'your_mysql_host',
	//   user: 'your_mysql_user',
	//   password: 'your_mysql_password',
	//   database: 'your_mysql_database',
	// },
	smtp: {
		host: "your_smtp_host",
		port: 587,
		secure: false,
		auth: {
			user: "your_smtp_username",
			pass: "your_smtp_password",
		},
	},
	// session: {
	//   secret: 'your_session_secret',
	//   resave: false,
	//   saveUninitialized: false,
	// },
};
