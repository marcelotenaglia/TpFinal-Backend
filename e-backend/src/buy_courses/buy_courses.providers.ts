import { constants } from "src/constants/constants";
import { DataSource } from "typeorm";
import { BuyCourse } from "./entities/buy_course.entity";


export const buy_courseProviders = [
  {
    provide: constants.buyCourseRespository,

    useFactory:(dataSource : DataSource) => dataSource.getRepository(BuyCourse),

    inject: [constants.dataSource]
  }  
];