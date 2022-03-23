import { Test, TestingModule } from '@nestjs/testing';
import { FundraisersService } from './fundraisers.service';

describe('FundraisersService', () => {
  let service: FundraisersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundraisersService],
    }).compile();

    service = module.get<FundraisersService>(FundraisersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
