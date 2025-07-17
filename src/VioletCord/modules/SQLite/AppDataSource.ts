import { DataSource } from "typeorm";

export default new DataSource({
    type: "sqlite",
    database: "violetcord.db",
    synchronize: true,
    logging: true,
    entities: ["src/VioletCord/modules/SQLite/entity/*.ts"]
})