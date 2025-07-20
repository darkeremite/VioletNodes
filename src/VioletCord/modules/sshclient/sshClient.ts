import { Client, ConnectConfig } from "ssh2";
import dotenv from "dotenv"
import logger from "../../../utils/Logger.js";

class sshClient {
    private _conn = new Client()
    private _connAlive = false

    private _connConf: ConnectConfig

    constructor(connectConfig:ConnectConfig) {
        this._connConf = connectConfig
    }

    get connectionAlive() {
        return this._connAlive
    }

    public Init() {
        dotenv.config()

        this._conn.on('end', () => {
            this._connAlive = false
            logger.warn('SSH connection close');
        });
        this._conn.on('error', (err) => {
            this._connAlive = false
            logger.error('SSH connection execute new error')
            logger.error(`[${err.level}] ${err.name}:\n${err.message}\n\n${err.description}`)
        })
        this._conn.once("ready", () => logger.info("SSH connection is ready!"));
        logger.debug("Trying connect to SSH...")
        this._conn.connect({
            host: this._connConf.host,
            port: this._connConf.port,
            username: this._connConf.username,
            password: this._connConf.password,
            debug: process.env.DEBUG ? logger.debug : undefined
        })
    }

    public async checkAlive(): Promise<any> {
        try {
            await this._conn.once("ready", () => logger.debug("SSH connection is ready!"));
            this._connAlive = true
        } catch {
            this._connAlive = false
        }
    }

    public async execCommand(command:string) {
        return new Promise<string>((resolve, reject) => {
            this._conn.exec(command, (err, stream) => {
                if (err) return reject(`${err.name}`);

                let output = '';
                stream
                .on('data', (data: Buffer) => output += data.toString())
                .on('close', () => { resolve(output) })
                .stderr.on('data', (data:Buffer) => {
                    logger.error(`SSH command error:\n${data.toString()}`)
                    reject(data.toString())
                });
            });
        });
    }

    public async deployCommand(): Promise<string> {
        const ret = await this.execCommand(process.env.SSH_COMMAND_DEPLOY)
        logger.debug(`result deploy command:\n${ret}`)
        return ret
    }
}

export default sshClient