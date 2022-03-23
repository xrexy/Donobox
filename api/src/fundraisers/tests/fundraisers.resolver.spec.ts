import { Test, TestingModule } from '@nestjs/testing';
import { FundraisersResolver } from '../fundraisers.resolver';

describe('FundraisersResolver', () => {
  let resolver: FundraisersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundraisersResolver],
    }).compile();

    resolver = module.get<FundraisersResolver>(FundraisersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
