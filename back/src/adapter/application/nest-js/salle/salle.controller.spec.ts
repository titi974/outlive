import { Test, TestingModule } from '@nestjs/testing';
import { SalleController } from './salle.controller';

describe('Salle Controller', () => {
  let controller: SalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalleController],
    }).compile();

    controller = module.get<SalleController>(SalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
