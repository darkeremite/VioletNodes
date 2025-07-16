import Bot from '../utils/Bot.js'
import { join } from 'path'
import { readdirSync } from 'fs'
import AppCommandBuilder from '../utils/AppCommandBuilder.js'
import { ApplicationCommandData, ApplicationCommandType } from 'discord.js'
import { pathToFileURL } from 'url'

export default async (client: Bot): Promise<Array<ApplicationCommandData>> => {
	const commandPath = join(client.bot_dirname, 'commands')
	client.logger.debug(`Bot loading commands from ${commandPath}`)
	const commands = new Array<ApplicationCommandData>()
	try {
		for (const file of readdirSync(commandPath).filter(file =>
			file.endsWith('.js')
		)) {
			try {
				client.logger.debug(`Bot found file command ${file}`)
				const command: AppCommandBuilder<ApplicationCommandType> = await import(
					pathToFileURL(join(commandPath, file)).href
				)
					.then(module => module.default)
					.finally()
				client.addInteraction(command.name, command.execute)
				commands.push(command.data() as ApplicationCommandData)
				client.logger.debug(`Bot loaded command ${command.name}`)
			} catch (error) {
				client.logger.warn(`Bot can't loading command ${file}: \n${error}`)
			}
		}
	} catch (error) {
		client.logger.warn(`Bot can't loading commands: \n${error}`)
	}
	return commands
}
