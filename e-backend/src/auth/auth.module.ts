import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from './hash/hash.service';
import { DatabaseModule } from 'src/database/database.modele';
import { userProviders } from 'src/users/users.providers';
import { rolesProviders } from 'src/roles/roles.providers';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: 'vEntorno.env',  // Asegúrate de que este nombre es correcto
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,  // Variable de entorno para el secret
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, HashService, ...userProviders, ...rolesProviders],
  controllers: [AuthController],
})
export class AuthModule {
  constructor() {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('JWT_EXPIRATION:', process.env.JWT_EXPIRATION);
  }
}
