import { Events, Interaction } from 'discord.js'
import EventBuilder from '../../utils/EventBuilder.js'
import Bot from '../../utils/Bot.js'

function findInteraction(client: Bot, id: string) {
	try {
		let execute = client.getInteraction(id)!
		return execute
	} catch (e) {
		client.logger.error(`Interaction ${id} not found in client`)
		client.logger.error(e)
	}
}

export default new EventBuilder({
	name: Events.InteractionCreate,
	once: false,

	execute: async (client: Bot, interaction: Interaction) => {
		client.logger.debug(
			`${interaction.user.id} use ${interaction.type}(${interaction.id})`
		)

		//Определение типа взаимодействия с ботом
		switch (true) {
			case interaction.isCommand():
				client.logger.info(
					`(${interaction.user.id}) ${interaction.user.username} use command /${interaction.commandName}`
				)
				let execute = findInteraction(client, interaction.commandName)
				await execute
				break
		}
	},
})
