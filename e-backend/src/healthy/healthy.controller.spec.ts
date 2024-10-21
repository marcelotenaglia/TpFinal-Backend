import { Test, TestingModule } from '@nestjs/testing';
import { HealthyController } from './healthy.controller';
import { HealthyService } from './healthy.service';

describe('HealthyController', () => {
  let controller: HealthyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthyController],
      providers: [HealthyService],
    }).compile();

    controller = module.get<HealthyController>(HealthyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
