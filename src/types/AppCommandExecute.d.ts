import {
	ChatInputCommandInteraction,
	CommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from 'discord.js'

type AppCommandExecute = {
	(
		interaction: exstend<
			ChatInputCommandInteraction,
			UserContextMenuCommandInteraction,
			MessageContextMenuCommandInteraction
		>,
		...args: any
	): Promise<any>
}
