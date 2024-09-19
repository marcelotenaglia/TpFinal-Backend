import { forwardRef,Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { userProviders } from './users.providers';
import { rolesProviders } from 'src/roles/roles.providers';
import { RolesModule } from 'src/roles/roles.module';
import { RatingModule } from 'src/rating/rating.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';
import { favoritesProviders } from 'src/favorites/favorites.providers';


@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => RolesModule),
    forwardRef(() =>  RatingModule),
    forwardRef(() =>  FavoritesModule),
    forwardRef(() =>  CoursesModule),
  ],
  controllers: [UsersController],
  providers: [
    ...rolesProviders,
    ...userProviders,
    ...coursesProviders,
    ...favoritesProviders,
    UsersService
  ],
})
export class UsersModule {}
