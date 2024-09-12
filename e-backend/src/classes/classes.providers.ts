import { DataSource } from "typeorm";
import { Class } from "./entities/class.entity";
import { constants } from "src/constants/constants";

export const ClassesRepository = [
{
    provide: constants.classesRepository,

    useFactory:(dataSource: DataSource) => dataSource.getRepository(Class),

    Inject: [constants.dataSource]
},
];