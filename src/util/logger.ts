import logger from "pino";
// import { Logger } from "pino";

const log = logger({
	base: { pid: false },
	transport: {
		target: "pino-pretty",
		options: {
			colorized: true,
		},
	},

	// timestamp: (): any => {
	// 	// `,"time": "${new Date().toLocaleString()}"`;
	// 	`,time: ${new Date().toLocaleString()}`;
	// },

	timestamp: () => `, time:${new Date().toUTCString()}`,

	// timestamp: () => `,"time": "${new Date().toLocaleString()}"`,

	// timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
});

export default log;

// function logger(arg0: {
// 	base: { pid: boolean };
// 	transport: { target: string; options: { colorized: boolean } };
// 	timestamp: () => any;
// }) {
// 	throw new Error("Function not implemented.");
// }
