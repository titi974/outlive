import { Test, TestingModule } from '@nestjs/testing'
import { LeadersController } from '../adapter/application/nest-js/leaders/leaders.controller'
import { LeadersService } from '../adapter/application/nest-js/leaders/leaders.service'
import { providerLeaderRepository } from './mock/LeaderSpyOn'
import { providerJeuxRepository } from './mock/JeuxSpyOn'
import { JeuxRepositoryTypeORM } from '../adapter/repository/type-orm/JeuxRepositoryTypeORM'
import { getRepositoryToken } from '@nestjs/typeorm'
import { COULEURS } from '../domain/constante/COULEURS'
import { LeaderRepositoryTypeORM } from '../adapter/repository/type-orm/LeaderRepositoryTypeORM'
import { JeuxEntity } from '../adapter/repository/type-orm/entity/Jeux.entity'
import { JoueurEntity } from '../adapter/repository/type-orm/entity/Joueur.entity'
import Session from '../domain/mise-en-place/valueObject/Session'
import { names, uniqueNamesGenerator } from 'unique-names-generator'
import { FactoryLeaders } from './factory/LeaderFactory'

const FactoryJoueurEntity = (id: string, jeuxId: string, couleur: COULEURS): JoueurEntity => {
    const joueurEntity = new JoueurEntity()
    joueurEntity.id = id
    joueurEntity.jeuxId = jeuxId
    joueurEntity.couleur = couleur
    joueurEntity.pseudo = uniqueNamesGenerator({ dictionaries: [names], length: 1 })
    return joueurEntity
}

describe('Leaders Controller', () => {
    let controller: LeadersController
    let jeuxRepositoryTypeORM: JeuxRepositoryTypeORM
    let leaderRepositoryTypeORM: LeaderRepositoryTypeORM

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LeadersController],
            providers: [providerLeaderRepository, providerJeuxRepository, LeadersService],
        }).compile()
        jeuxRepositoryTypeORM = module.get<JeuxRepositoryTypeORM>(
            getRepositoryToken(JeuxRepositoryTypeORM),
        )
        leaderRepositoryTypeORM = module.get<LeaderRepositoryTypeORM>(
            getRepositoryToken(LeaderRepositoryTypeORM),
        )
        controller = module.get<LeadersController>(LeadersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
        // jeuxRepositoryTypeORM.afficherLeJeux(new Session('1'))
    })
    it('random leaders  de 2', async () => {
        const session = new Session('1')
        const joueurEntity1 = FactoryJoueurEntity('1', '1', COULEURS.ROUGE)
        const joueurEntity2 = FactoryJoueurEntity('2', '1', COULEURS.BLEU)
        const jeuxEntity = new JeuxEntity()
        jeuxEntity.id = '1'
        jeuxEntity.nbreJoueur = 2
        jeuxEntity.joueurs = Promise.resolve([joueurEntity1, joueurEntity2])

        jest.spyOn(jeuxRepositoryTypeORM, 'findOne').mockResolvedValue(jeuxEntity)
        jest.spyOn(leaderRepositoryTypeORM, 'find').mockResolvedValue([...FactoryLeaders(10)])
        const joueurWebs = await controller.getRandom(session.value)
        expect(joueurWebs).toHaveLength(2)
        const joueurWeb1 = joueurWebs.find(j => j.id === '1')
        const joueurWeb2 = joueurWebs.find(j => j.id === '2')
        expect(joueurWeb1.id).toBe(joueurEntity1.id)
        expect(joueurWeb1.leaderAChoisir).toHaveLength(2)
        expect(joueurWeb2.id).toBe(joueurEntity2.id)
        expect(joueurWeb2.leaderAChoisir).toHaveLength(2)
    })
})
