import { DataSource } from "typeorm";
import { Course } from "./entities/course.entity";
import { constants } from "src/constants/constants";

export const coursesProviders = [
{
    provide: constants.coursesRepository,

    useFactory:(dataSource: DataSource) => dataSource.getRepository(Course),

    inject: [constants.dataSource]

},
];