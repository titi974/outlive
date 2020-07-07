import { Test, TestingModule } from '@nestjs/testing'
import { AbrisService } from '../adapter/application/nest-js/abris/abris.service'
import { providerJoueurRepository } from './mock/JoueurSpyOn'
import { providerAbrisRepository } from './mock/AbrisSpyOn'
import { providerUUIDGenerator } from './mock/UUIDGeneratorMock'
import { providerEquipementRepository } from './mock/EquipementSpyOn'

describe('AbrisService', () => {
    let service: AbrisService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [providerEquipementRepository, providerUUIDGenerator, providerAbrisRepository, providerJoueurRepository, AbrisService],
        }).compile()

        service = module.get<AbrisService>(AbrisService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
