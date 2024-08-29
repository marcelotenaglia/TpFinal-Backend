import { DataSource } from "typeorm";
import { UserMedia } from "./entities/user_media.entity";
import { constants } from "src/constants/constants";

export const userMediaProviders = [
    {
        provide: constants.userMediaRepository,

        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserMedia),

        inject: [constants.dataSource],
    }
]