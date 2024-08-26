import { DataSource } from "typeorm";
import { Company } from "./entities/company.entity";
import { constants } from "src/constants/constants";

export const companyRepository = [
{
    provide: constants.companyRepository,

    useFactory:(dataSource: DataSource) => dataSource.getRepository(Company),

    Inject: [constants.datasource]
},
];