import { forwardRef,Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';
import { userProviders } from 'src/users/users.providers';
import { favoritesProviders } from './favorites.providers';

@Module({
  imports:[
    DatabaseModule,
    forwardRef(() =>  UsersModule),
    forwardRef(() =>  CoursesModule),
  ],
  controllers: [FavoritesController],
  providers: [
    ...coursesProviders,
    ...userProviders,
    ...favoritesProviders,
    FavoritesService],
    exports:[...userProviders]
})
export class FavoritesModule {}
