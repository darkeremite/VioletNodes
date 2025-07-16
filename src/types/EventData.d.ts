import { Events } from 'discord.js'
import Bot from '../utils/Bot.ts'

type EventData = {
	name: Events
	once?: boolean
	execute: (client: Bot, ...args: any[]) => Promise<any>
}

export default EventData
