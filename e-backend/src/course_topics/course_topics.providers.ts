import { DataSource } from "typeorm";
import { CourseTopic } from "./entities/course_topic.entity";
import { constants } from "src/constants/constants";

export const courseTopicsRepository = [
{
    provide: constants.course_topicsRepository,

    useFactory:(dataSource: DataSource) => dataSource.getRepository(CourseTopic),

    Inject: [constants.datasource]
},
];