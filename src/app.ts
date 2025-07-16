import Bot from './utils/Bot.js'
import dotenv from 'dotenv'

dotenv.config()

const world_crisis_bot = new Bot(process.env.BOT_TOKEN, process.env.BOT_NAME)

world_crisis_bot.run()
