import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { UsersModule } from 'src/users/users.module';
import { userProviders } from 'src/users/users.providers';
import { rolesProviders } from './roles.providers';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
  controllers: [RolesController],

  providers: [
    ...rolesProviders,
    ...userProviders,
    RolesService],
})
export class RolesModule {}
