import { DataSource } from "typeorm";

export default new DataSource({
    type: "sqlite",
    database: "violetcore.db",
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.ts"]
})