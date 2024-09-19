import { DataSource } from "typeorm";
import { Class } from "./entities/class.entity";
import { constants } from "src/constants/constants";

export const classesProviders = [
{
    provide: constants.classesRepository,

    useFactory:(dataSource: DataSource) => dataSource.getRepository(Class),


    inject: [constants.dataSource]

},
];