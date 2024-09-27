import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from './hash/hash.service';
import { DatabaseModule } from 'src/database/database.modele';
import { userProviders } from 'src/users/users.providers';
import { rolesProviders } from 'src/roles/roles.providers';

@Module({
  imports:[
    DatabaseModule,
  ],

  providers: [AuthService, HashService, 
    ...userProviders,
    ...rolesProviders,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
