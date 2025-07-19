import { Client, GatewayIntentBits, IntentsBitField, Interaction } from 'discord.js'
import logger from './Logger.js'
import { join } from 'path'
import defaultDir from '../utils/defaultDir.js'
import eventHandler from '../handlers/eventHandler.js'
import sshClient from '../VioletCord/modules/sshclient/sshClient.js'
import sqliteClient from '../VioletCord/modules/SQLite/sqliteClient.js'

export default class Bot extends Client {
	logger = logger

	//bot directory whit events and interactions
	bot_dirname: string
	//ssh module
	ssh_client?: sshClient
	//sqlite client
	sqlite_client?: sqliteClient

	//bot token
	private _bot_token: string
	//bot name for logging
	private _bot_name: string
	//bot interactions for event InteractionCreate
	private _interactions: Map<string, (client:Bot, interaction: Interaction) => Promise<any>>

	constructor(token: string, bot_dirname: string, ssh_module:sshClient|undefined=undefined, sqlite_module:sqliteClient|undefined=undefined) {
		super({ intents: [
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildInvites,
			GatewayIntentBits.Guilds
		] })
		this.logger.debug(`Bot initialization: ${bot_dirname}`)

		this._bot_token = token
		this._bot_name = bot_dirname
		this._interactions = new Map()

		this.ssh_client = ssh_module
		this.sqlite_client = sqlite_module

		if (defaultDir) {
			const bot_dir = join(defaultDir, bot_dirname)
			this.logger.debug(`Bot dir path: ${bot_dir}`)
			this.bot_dirname = bot_dir
		}
		else {
			throw new Error("Operating system don't support for this bot")
		}

		eventHandler(this)
	}

	addInteraction(
		id: string,
		callback: (client:Bot, interaction: Interaction) => Promise<any>
	) {
		this._interactions.set(id, callback)
	}

	getInteraction(
		name: string
	): ((client:Bot, interaction: Interaction) => Promise<any>) | undefined {
		return this._interactions.get(name)
	}

	run(): void {
		this.logger.debug(`Bot is starting...`)
		if (this.ssh_client) {
			this.logger.debug("SSH client created")
			this.ssh_client.Init()
		}
		if (this.sqlite_client) {
			this.logger.debug("SQLite client created")
			this.sqlite_client.Init()
		}
		this.login(this._bot_token)
			.then(() => {
				this.logger.info(`Bot started successfully`)
			})
			.catch(error => {
				this.logger.error(`Error starting bot : \n${error}`)
			})
	}
}
