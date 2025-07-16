import { Events } from 'discord.js'
import EventData from '../types/EventData.js'
import Bot from './Bot.js'

class EventBuilder implements EventData {
	name: Events
	once: boolean
	execute: (client: Bot, ...args: any[]) => Promise<any>

	constructor(options: EventData) {
		this.name = options.name
		this.once = options.once ?? false
		this.execute = options.execute
	}
}

export default EventBuilder
