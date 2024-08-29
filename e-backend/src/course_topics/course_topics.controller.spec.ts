import { Test, TestingModule } from '@nestjs/testing';
import { CourseTopicsController } from './course_topics.controller';
import { CourseTopicsService } from './course_topics.service';

describe('CourseTopicsController', () => {
  let controller: CourseTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseTopicsController],
      providers: [CourseTopicsService],
    }).compile();

    controller = module.get<CourseTopicsController>(CourseTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
