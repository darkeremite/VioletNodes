import {
	ApplicationCommandType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	PermissionsBitField,
} from 'discord.js'
import AppCommandBuilder from '../../utils/AppCommandBuilder.js'
import { checkSSH } from '../global/checkSSH.js'

export default new AppCommandBuilder<ApplicationCommandType.ChatInput>({
	type: ApplicationCommandType.ChatInput,
	name: 'deploy',
	description: 'create new vds',
	dmPermission: false,
	defaultMemberPermissions: PermissionsBitField.Flags.ModerateMembers,

	execute: async (client, interaction: ChatInputCommandInteraction) => {
		await interaction.deferReply({
			flags: MessageFlags.Ephemeral
		})
		if (!checkSSH(client)) {
			await interaction.reply({
					content: 'Error connect to server!',
					flags: MessageFlags.Ephemeral
				})
			return
		}
		try {
			await client.ssh_client!.deployCommand()
		}
		catch {
			await interaction.reply({
					content: 'Error command run!',
					flags: MessageFlags.Ephemeral
				})
			return
		}
		await interaction.reply({
			content: 'Pong!',
			flags: MessageFlags.Ephemeral
		})
	},
})
