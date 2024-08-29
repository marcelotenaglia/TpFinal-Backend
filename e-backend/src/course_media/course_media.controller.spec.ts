import { Test, TestingModule } from '@nestjs/testing';
import { CourseMediaController } from './course_media.controller';
import { CourseMediaService } from './course_media.service';

describe('CourseMediaController', () => {
  let controller: CourseMediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseMediaController],
      providers: [CourseMediaService],
    }).compile();

    controller = module.get<CourseMediaController>(CourseMediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
