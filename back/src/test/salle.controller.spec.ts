import { Test, TestingModule } from '@nestjs/testing'
import { SalleController } from '../adapter/application/nest-js/salle/salle.controller'
import { SalleService } from '../adapter/application/nest-js/salle/salle.service'
import { providerJeuxRepository } from './mock/JeuxSpyOn'
import { providerJoueurRepository } from './mock/JoueurSpyOn'
import { providerSalleRepository } from './mock/SalleSpyOn'

describe('Salle Controller', () => {
    let controller: SalleController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SalleController],
            providers: [providerJoueurRepository, providerJeuxRepository, providerSalleRepository, SalleService],
        }).compile()

        controller = module.get<SalleController>(SalleController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
