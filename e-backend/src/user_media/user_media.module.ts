import { Module } from '@nestjs/common';
import { UserMediaService } from './user_media.service';
import { UserMediaController } from './user_media.controller';

@Module({
  controllers: [UserMediaController],
  providers: [UserMediaService],
})
export class UserMediaModule {}
