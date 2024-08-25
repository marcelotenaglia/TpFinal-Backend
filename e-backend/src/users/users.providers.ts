import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { constants } from "../constants/constants"

export const userProvider = [
    
    {
        provide: constants.userRepository,

        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),

        inject: [constants.dataSource],
    } 
]