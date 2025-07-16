import {
	ApplicationCommandType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	PermissionsBitField,
} from 'discord.js'
import AppCommandBuilder from '../../utils/AppCommandBuilder.js'

export default new AppCommandBuilder<ApplicationCommandType.ChatInput>({
	type: ApplicationCommandType.ChatInput,
	name: 'ping',
	description: 'Check ping bot',
	dmPermission: false,
	defaultMemberPermissions: PermissionsBitField.Flags.ModerateMembers,

	execute: async (interaction: ChatInputCommandInteraction) => {
		await interaction.reply({
			content: 'Pong!',
			flags: MessageFlags.Ephemeral
		})
	},
})
