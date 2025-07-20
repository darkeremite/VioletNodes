namespace NodeJS {
	interface ProcessEnv {
		DEBUG: boolean

		BOT_TOKEN: string
		BOT_NAME: string

		SSH_HOST: string,
		SSH_PORT: number,
		SSH_USERNAME: string,
		SSH_PASSWORD?: string,
		SSH_PRIVATE_KEY?: string

		SSH_COMMAND_DEPLOY: string
	}
}
