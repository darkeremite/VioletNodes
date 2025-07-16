import Bot from './utils/Bot.js'
import dotenv from 'dotenv'

dotenv.config()

const VioletCord = new Bot(process.env.BOT_TOKEN, process.env.BOT_NAME)

VioletCord.run()
