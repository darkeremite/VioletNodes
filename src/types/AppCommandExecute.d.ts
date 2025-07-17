import {
	ChatInputCommandInteraction,
	CommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from 'discord.js'
import Bot from '../utils/Bot.ts'

type AppCommandExecute = {
	(	
		client: Bot,
		interaction: exstend<
			ChatInputCommandInteraction,
			UserContextMenuCommandInteraction,
			MessageContextMenuCommandInteraction
		>,
		...args: any
	): Promise<any>
}
