import { DataSource } from "typeorm";
import { constants } from "src/constants/constants";
import { Category } from "./entities/category.entity";

export const categoriesProviders = [
   {
     provide: constants.categoriesRepository,

     useFactory:(dataSource: DataSource) => dataSource.getRepository(Category),

     inject: [constants.dataSource]

},
];