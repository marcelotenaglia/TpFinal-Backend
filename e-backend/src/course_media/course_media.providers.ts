import { DataSource } from "typeorm";
import { CourseMedia } from "./entities/course_media.entity";
import { constants } from "src/constants/constants";

export const courseMediaRepository = [
{
    provide: constants.course_mediaRepository,

    useFactory:(dataSource: DataSource) => dataSource.getRepository(CourseMedia),

    Inject: [constants.dataSource]
},
];