import { DataSource } from "typeorm";

import { constants } from "../constants/constants"
import { Rating } from "./entities/rating.entity";

export const ratingProviders = [
    
    {
        provide: constants.ratingRepository,

        useFactory: (dataSource: DataSource) => dataSource.getRepository(Rating),

        inject: [constants.dataSource],
    } 
]