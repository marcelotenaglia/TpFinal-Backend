import { Test, TestingModule } from '@nestjs/testing';
import { BuyCoursesService } from './buy_courses.service';

describe('BuyCoursesService', () => {
  let service: BuyCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyCoursesService],
    }).compile();

    service = module.get<BuyCoursesService>(BuyCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
