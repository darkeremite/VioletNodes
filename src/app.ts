import Bot from './utils/Bot.js'
import dotenv from 'dotenv'
import sshClient from './VioletCord/modules/sshclient/sshClient.js'
import { ConnectConfig } from 'ssh2';

dotenv.config()

const VioletSSH = new sshClient({
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD
})

const VioletCord = new Bot(process.env.BOT_TOKEN, process.env.BOT_NAME, VioletSSH)

VioletCord.run()
