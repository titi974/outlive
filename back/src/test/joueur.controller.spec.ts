import { Test, TestingModule } from '@nestjs/testing'
import { JoueurController } from '../adapter/application/nest-js/joueur/joueur.controller'
import { JoueurService } from '../adapter/application/nest-js/joueur/joueur.service'
import { providerJeuxRepository } from './mock/JeuxSpyOn'
import { providerJoueurRepository } from './mock/JoueurSpyOn'
import { providerLeaderRepository } from './mock/LeaderSpyOn'

describe('Joueur Controller', () => {
    let controller: JoueurController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [JoueurController],
            providers: [providerJeuxRepository, providerLeaderRepository, providerJoueurRepository, JoueurService],
        }).compile()

        controller = module.get<JoueurController>(JoueurController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
