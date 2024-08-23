import { Test, TestingModule } from '@nestjs/testing';
import { CourseMediaService } from './course_media.service';

describe('CourseMediaService', () => {
  let service: CourseMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseMediaService],
    }).compile();

    service = module.get<CourseMediaService>(CourseMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
