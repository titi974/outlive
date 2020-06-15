import {Test, TestingModule} from "@nestjs/testing";
import {JeuxController, nombreJoueur} from "../../adapter/application/nestJs/jeux/jeux.controller";
import {JeuxService} from "../../adapter/application/nestJs/jeux/jeux.service";
import {JeuxRepositoryTypeORM} from "../../adapter/repository/type-orm/JeuxRepositoryTypeORM";
import {UUIDGenerator} from "../../adapter/id-generator/UUIDGenerator";
import SpyInstance = jest.SpyInstance;
import {JeuxEntity} from "../../adapter/repository/type-orm/entity/Jeux.entity";

describe('Créer une partie', () => {
    let jeuxController: JeuxController
    let jeuxService: JeuxService

    let jeuxRepository: JeuxRepositoryTypeORM
    let spyJeuxRepositoryCreer: SpyInstance
    let spyJeuxRepositorySave: SpyInstance

    let uUIDGenerator: UUIDGenerator
    let spyUUIDGenerator: SpyInstance

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [JeuxController],
            providers: [JeuxService, JeuxRepositoryTypeORM, UUIDGenerator],
        }).compile()

        jeuxController = module.get<JeuxController>(JeuxController)
        jeuxService = module.get<JeuxService>(JeuxService)
        jeuxRepository = module.get<JeuxRepositoryTypeORM>(JeuxRepositoryTypeORM)
        uUIDGenerator = module.get<UUIDGenerator>(UUIDGenerator)
        spyUUIDGenerator = jest.spyOn(uUIDGenerator, 'execute')
        spyJeuxRepositoryCreer = jest.spyOn(jeuxRepository, 'creer')
        spyJeuxRepositorySave = jest.spyOn(jeuxRepository, 'save')
    })

    it('should be defined', async () => {
        expect(jeuxController).toBeDefined()
    })

    describe('créé', () => {
        it('avec succès', async () => {
            //Given
            jest.spyOn(jeuxService, 'creer')
            spyJeuxRepositoryCreer = jest.spyOn(jeuxRepository, 'creer')
            spyUUIDGenerator.mockReturnValue('1')
            spyJeuxRepositorySave.mockResolvedValue(Promise.resolve())
            const entity = new JeuxEntity()
            entity.id = '1'
            //When
            const body: nombreJoueur = {nombre: 2}
            const result = await jeuxController.creer(body)
            //Then
            expect(jeuxService.creer).toHaveBeenCalledWith(body.nombre)
            expect(jeuxRepository.creer).toHaveBeenCalled()
            expect(jeuxRepository.save).toHaveBeenCalledWith(entity)
            expect(result).toEqual('1')
        })
    })
})
