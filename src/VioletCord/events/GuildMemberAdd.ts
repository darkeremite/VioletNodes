import { Events, GuildMember } from 'discord.js'
import EventBuilder from '../../utils/EventBuilder.js'
import Bot from '../../utils/Bot.js'

export default new EventBuilder({
	name: Events.GuildMemberAdd,
	once: false,

	execute: async (client: Bot, member: GuildMember) => {
		client.logger.info(`(${member.id}) ${member.user.username} join on server!`)
        await client.sqlite_client!.newUser(member.id)
	},
})
