import { Events, Interaction } from 'discord.js'
import EventBuilder from '../../utils/EventBuilder.js'
import Bot from '../../utils/Bot.js'

function findInteraction(client: Bot, id: string) {
	let execute = client.getInteraction(id)
	return execute
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
				try {
					let execute = findInteraction(client, interaction.commandName)!
					await execute(interaction)
					break	
				} catch (e) {
					client.logger.error(`Interaction ${interaction.commandName} not found in client`)
					client.logger.error(e)
				}
		}
	},
})
