import { Test, TestingModule } from '@nestjs/testing';
import { HealthyService } from './healthy.service';

describe('HealthyService', () => {
  let service: HealthyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthyService],
    }).compile();

    service = module.get<HealthyService>(HealthyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
