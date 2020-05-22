import { Test, TestingModule } from '@nestjs/testing';
import { JeuxController } from '../../src/infra/jeux/controller/jeux.controller';
import { JeuxService } from '../../src/infra/jeux/service/jeux.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JeuxEntity } from '../../src/infra/jeux/entity/Jeux.entity';
import { Jeux } from '../../src/domain/jeux/entity/Jeux';

const MockRepository = {
  async save(jeux: Jeux): Promise<Jeux> {
    return Promise.resolve(jeux);
  },
};

describe('Jeux Controller', () => {
  let controller: JeuxController;
  let service: JeuxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JeuxController],
      providers: [JeuxService, {
        provide: getRepositoryToken(JeuxEntity),
        useValue: MockRepository,
      }],
    }).compile();

    controller = module.get<JeuxController>(JeuxController);
    service = module.get<JeuxService>(JeuxService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Créer un jeyx', () => {
    it('avec succès', async () => {
      jest.spyOn(service, 'creer');
      await controller.creer();
      expect(service.creer).toHaveBeenCalled();
    });
  });
});
