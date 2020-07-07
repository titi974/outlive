import { Test, TestingModule } from '@nestjs/testing'
import { JoueurService } from '../adapter/application/nest-js/joueur/joueur.service'
import { providerJoueurRepository } from './mock/JoueurSpyOn'
import { providerJeuxRepository } from './mock/JeuxSpyOn'
import { providerLeaderRepository } from './mock/LeaderSpyOn'

describe('JoueurService', () => {
    let service: JoueurService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [providerLeaderRepository, providerJoueurRepository, providerJeuxRepository, JoueurService],
        }).compile()

        service = module.get<JoueurService>(JoueurService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
