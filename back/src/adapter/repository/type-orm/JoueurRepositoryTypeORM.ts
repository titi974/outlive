import { EntityRepository, Repository } from 'typeorm'
import { JoueurEntity } from './entity/Joueur.entity'
import JoueurRepository from '../../../domain/mise-en-place/port/JoueurRepository'
import Jeux from '../../../domain/mise-en-place/entity/Jeux'
import Joueur from '../../../domain/mise-en-place/entity/Joueur'
import {
    mapJoueurDomainToPersistance,
    mapJoueurPersistanceToDomain,
} from './mapper/JoueurMapperPersistance'
import { Optional } from '@eastbanctech/ts-optional'
import { mapLeaderDomainToWeb } from '../../application/nest-js/mapper/LeaderMapper'
import { mapLeaderPersistanceToDomain } from './mapper/LeaderMapperPersistance'
import { JoueurId } from '../../../domain/mise-en-place/valueObject/JoueurId'

@EntityRepository(JoueurEntity)
export class JoueurRepositoryTypeORM extends Repository<JoueurEntity> implements JoueurRepository {
    constructor() {
        super()
    }

    async creerDesJoueur(jeux: Jeux): Promise<void> {
        const joueurEntities = jeux.joueurs.map(mapJoueurDomainToPersistance)
        joueurEntities.forEach(j => (j.jeuxId = jeux.session.value))
        await this.save(joueurEntities)
    }

    async enregistrerPseudo(joueurs: Joueur[]): Promise<void> {
        const joueurEntities = joueurs.map(mapJoueurDomainToPersistance)
        await this.save(joueurEntities)
    }

    async enregistrer(joueur: Joueur): Promise<void> {
        const joueurEntity = mapJoueurDomainToPersistance(joueur)
        await this.save(joueurEntity)
    }

    async findJoueurById(id: string): Promise<Optional<Joueur>> {
        let joueur: Joueur = null
        const joueurEntity = await this.findOne(id)
        if (joueurEntity) {
            const leaderEntity = await joueurEntity.leader
            joueur = mapJoueurPersistanceToDomain(joueurEntity)
            if (leaderEntity) {
                joueur.ajouterLeader(mapLeaderPersistanceToDomain(leaderEntity))
            }
        }
        return Optional.ofNullable(joueur)
    }

    async findJoueurByIds(joueurIds: JoueurId[]): Promise<Joueur[]> {
        const joueurEntities = Optional.ofNullable(
            await this.findByIds(joueurIds.map(id => id.value)),
        ).orElseThrow(() => new Error('Pas de joueur actif'))

        return Promise.all(
            joueurEntities.map(async joueurEntity => {
                const leaderEntity = await joueurEntity.leader
                const joueur = mapJoueurPersistanceToDomain(joueurEntity)
                if (leaderEntity) {
                    joueur.ajouterLeader(mapLeaderPersistanceToDomain(leaderEntity))
                }
                return joueur
            }),
        )
    }

    async mettreAJourDesJoueurs(joueurs: Joueur[]): Promise<void> {
        const joueurEntities = joueurs.map(mapJoueurDomainToPersistance)
        this.save(joueurEntities)
    }
}
