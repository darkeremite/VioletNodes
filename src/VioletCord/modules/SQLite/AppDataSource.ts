import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
import dotenv from "dotenv";

dotenv.config()

export default new DataSource({
    type: "sqlite",
    database: "violetcord.db",
    synchronize: true,
    logging: process.env.DEBUG,
    entities: [User]
})