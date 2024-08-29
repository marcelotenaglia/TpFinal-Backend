import { Test, TestingModule } from '@nestjs/testing';
import { BuyCoursesController } from './buy_courses.controller';
import { BuyCoursesService } from './buy_courses.service';

describe('BuyCoursesController', () => {
  let controller: BuyCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyCoursesController],
      providers: [BuyCoursesService],
    }).compile();

    controller = module.get<BuyCoursesController>(BuyCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
