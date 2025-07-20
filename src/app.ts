import Bot from './utils/Bot.js'
import dotenv from 'dotenv'
import sshClient from './VioletCord/modules/sshclient/sshClient.js'
import sqliteClient from './VioletCord/modules/SQLite/sqliteClient.js'

dotenv.config()

//Build VioletCord
const VioletSSH = 
new sshClient({
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
    privateKey: process.env.SSH_PRIVATE_KEY
})

const VioletSQLite = new sqliteClient()

const VioletCord = new Bot(process.env.BOT_TOKEN, process.env.BOT_NAME, VioletSSH, VioletSQLite)

VioletCord.run()
