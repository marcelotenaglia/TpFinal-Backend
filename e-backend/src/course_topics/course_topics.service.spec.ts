import { Test, TestingModule } from '@nestjs/testing';
import { CourseTopicsService } from './course_topics.service';

describe('CourseTopicsService', () => {
  let service: CourseTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseTopicsService],
    }).compile();

    service = module.get<CourseTopicsService>(CourseTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
