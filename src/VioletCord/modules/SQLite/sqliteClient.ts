import { Repository } from "typeorm"
import AppDataSource from "./AppDataSource.js"
import { User } from "./entity/User.js"
import logger from "../../../utils/Logger.js"


class sqliteClient {
    private _userRep: Repository<User>

    Init() {
        AppDataSource.initialize().then(() => {
            logger.debug("Initialization entity - User")
            this._userRep = AppDataSource.getRepository(User)
        })
    }

    async newUser(id:string) {
        const user = await this.getUser(id)
        if (user) {
            logger.debug(`User (${id}) be found in database`)
            return user
        }
        const newUser = new User();
        newUser.discord_id = id
        await this._userRep.save(newUser).then(() => {
            logger.debug(`New user save in database: ${newUser.discord_id}`)
        })
        return newUser
    }

    async getUser(id:string) {
        const user = await this._userRep.findOne({where:{discord_id:id}})
        if (user) {
            return user
        }
        return undefined
    }
}

export default sqliteClient