import { Test, TestingModule } from '@nestjs/testing'
import { AbrisController } from '../adapter/application/nest-js/abris/abris.controller'
import { providerAbrisRepository } from './mock/AbrisSpyOn'
import { AbrisService } from '../adapter/application/nest-js/abris/abris.service'
import { providerUUIDGenerator } from './mock/UUIDGeneratorMock'
import { providerJoueurRepository } from './mock/JoueurSpyOn'
import { providerEquipementRepository } from './mock/EquipementSpyOn'


describe('Abris Controller', () => {
    let controller: AbrisController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AbrisController],
            providers: [providerEquipementRepository, providerUUIDGenerator, providerJoueurRepository, providerAbrisRepository, AbrisService],
        }).compile()

        controller = module.get<AbrisController>(AbrisController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
