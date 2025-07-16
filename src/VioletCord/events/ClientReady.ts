import { Events } from 'discord.js'
import EventBuilder from '../../utils/EventBuilder.js'
import Bot from '../../utils/Bot.js'
import commandHandler from '../../handlers/commandHandler.js'

export default new EventBuilder({
	name: Events.ClientReady,
	once: true,

	execute: async (client: Bot) => {
		client.logger.info(`${client.user?.username} is ready!`)

		const commands = await commandHandler(client)
		client.application?.commands.set(commands)
		client.logger.debug(`Loaded ${commands.length} commands`)
	},
})
