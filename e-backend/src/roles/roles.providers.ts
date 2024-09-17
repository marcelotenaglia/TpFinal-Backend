import { constants } from "src/constants/constants"
import { DataSource } from "typeorm"
import { Role } from "./entities/role.entity"


export const rolesProviders = [
    {
        provide:constants.rolesRepository,

        useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
        
        inject: [constants.dataSource],



},
];