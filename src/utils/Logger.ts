import { createLogger, format, transports } from "winston";
import dotenv from "dotenv"

dotenv.config()
const logger = createLogger({
		level: process.env.DEBUG ? 'debug' : 'info',
		format: format.cli(),
		transports: [new transports.Console()],
	})

export default logger