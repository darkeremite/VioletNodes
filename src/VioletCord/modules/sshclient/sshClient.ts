import { Client, ConnectConfig } from "ssh2";
import dotenv from "dotenv"
import logger from "../../../utils/Logger.js";

class sshClient {
    private _conn = new Client()
    private _connAlive = false
    private _logger = logger

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
            this._logger.warn('SSH connection close');
        });
        this._conn.on('error', (err) => {
            this._connAlive = false
            this._logger.error('SSH connection execute new error')
            this._logger.error(`[${err.level}] ${err.name}:\n${err.message}\n\n${err.description}`)
        })
        this._conn.once("ready", () => this._logger.info("SSH connection is ready!"));
        this._logger.debug("Trying connect to SSH...")
        this._conn.connect({
            host: this._connConf.host,
            port: this._connConf.port,
            username: this._connConf.username,
            password: this._connConf.password,
        })
    }

    public async checkAlive(): Promise<any> {
        try {
            await this._conn.once("ready", () => this._logger.debug("SSH connection is ready!"));
            this._connAlive = true
        } catch {
            this._connAlive = false
        }
    }

    public async execCommand(command:string) {
        return new Promise((resolve, reject) => {
            this._conn.exec(command, (err, stream) => {
                if (err) return reject(err);

                let output = '';
                stream
                .on('data', (data: Buffer) => output += data.toString())
                .on('close', () => resolve(output))
                .stderr.on('data', (data) => reject(data.toString()));
            });
        });
    }

    public async deployCommand() {
        await this.execCommand("echo 'this is deploy command!'")
    }
}

export default sshClient