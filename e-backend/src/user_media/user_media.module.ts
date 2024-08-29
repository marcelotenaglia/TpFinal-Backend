import { Module } from '@nestjs/common';
import { UserMediaService } from './user_media.service';
import { UserMediaController } from './user_media.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { userMediaProviders } from './user_media.provider';
import { userProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserMediaController],
  providers: [
    ...userMediaProviders,
    ...userProviders,
    UserMediaService],
})
export class UserMediaModule {}
