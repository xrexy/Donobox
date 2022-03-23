import { Test, TestingModule } from '@nestjs/testing';
import { FundraisersController } from '../fundraisers.controller';

describe('FundraisersController', () => {
  let controller: FundraisersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundraisersController],
    }).compile();

    controller = module.get<FundraisersController>(FundraisersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
