import { constants } from "src/constants/constants";
import { DataSource } from "typeorm";
import { Favorite } from "./entities/favorite.entity";


export const favoritesProviders = [
  {
    provide: constants.favoritesRepository,

    useFactory:(dataSource : DataSource) => dataSource.getRepository(Favorite),

    inject: [constants.dataSource]
  }  
];