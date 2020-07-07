import { Test, TestingModule } from '@nestjs/testing'
import { SalleService } from '../adapter/application/nest-js/salle/salle.service'
import { providerJeuxRepository } from './mock/JeuxSpyOn'
import { providerSalleRepository } from './mock/SalleSpyOn'

describe('SalleService', () => {
    let service: SalleService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [providerSalleRepository, providerJeuxRepository, SalleService],
        }).compile()

        service = module.get<SalleService>(SalleService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
