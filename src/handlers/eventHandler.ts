import Bot from '../utils/Bot.js'
import { join } from 'path'
import { readdirSync } from 'fs'

export default (client: Bot): void => {
	const eventPath = join(client.bot_dirname, 'events')
	client.logger.debug(`Bot loading events from ${eventPath}`)
	try {
		readdirSync(eventPath)
			.filter(file => file.endsWith('.js'))
			.forEach(async file => {
				try {
					client.logger.debug(`Bot found file event ${file}`)
					const event = await import(join(eventPath, file)).then(
						module => module.default
					)
					if (event.once) {
						client.once(event.name, (...args) => event.execute(client, ...args))
					} else {
						client.on(event.name, (...args) => event.execute(client, ...args))
					}
					client.logger.debug(`Bot loaded event (${event.name})`)
				} catch (error) {
					client.logger.warn(`Bot can't loading event ${file}: \n${error}`)
				}
			})
	} catch (error) {
		client.logger.warn(`Bot can't loading events: \n${error}`)
	}
}
