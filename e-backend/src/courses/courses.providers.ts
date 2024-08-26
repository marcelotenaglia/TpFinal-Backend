import { DataSource } from "typeorm";
import { Course } from "./entities/course.entity";
import { constants } from "src/constants/constants";

export const CoursesRepository = [
{
    provide: constants.coursesRepository,

    useFactory:(dataSource: DataSource) => dataSource.getRepository(Course),

    Inject: [constants.datasource]
},
];