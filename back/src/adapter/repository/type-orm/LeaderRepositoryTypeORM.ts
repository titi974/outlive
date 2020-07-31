import { EntityRepository, Repository } from 'typeorm'
import { LeaderEntity } from './entity/Leader.entity'
import LeaderRepository from '../../../domain/mise-en-place/port/LeaderRepository'
import Leader from '../../../domain/mise-en-place/entity/Leader'
import { Optional } from '@eastbanctech/ts-optional'
import LeaderId from '../../../domain/mise-en-place/valueObject/LeaderId'
import Ressource from '../../../domain/mise-en-place/entity/Ressource'
import Equipement from '../../../domain/mise-en-place/entity/Equipement'
import { mapEquipementPersistanceToDomain } from './mapper/EquipementMapperPersistance'

const mapLeaderPersistanceToDomain = (leaderEntity: LeaderEntity, equipement: Equipement): Leader => {
    const { id, identite, age, photo, profession, ressources } = leaderEntity
    const lesRessources = ressources.map(
        ressource => new Ressource(ressource.name, ressource.quantite),
    )
    return new Leader(new LeaderId(id), identite, profession, age, photo, lesRessources, equipement)
}

@EntityRepository(LeaderEntity)
export class LeaderRepositoryTypeORM extends Repository<LeaderEntity> implements LeaderRepository {
    async allLeaders(): Promise<Leader[]> {
        const leaderEntities = Optional.ofNullable(await this.find()).orElseThrow(
            () => new Error('Aucun leader'),
        )
        return Promise.all(
            leaderEntities.map(async leader => {
                const equipementEntity = await leader.equipement
                const equipement = mapEquipementPersistanceToDomain(equipementEntity)
                return mapLeaderPersistanceToDomain(leader, equipement)
            }),
        )
    }

    async leaderByNom(leaderNom: string): Promise<Leader> {
        const leaderEntityOptional = Optional.ofNullable(
            await this.findOne({ identite: leaderNom }),
        ).orElseThrow(() => new Error('Aucun leader'))
        const equipementEntity = await leaderEntityOptional.equipement
        let equipement
        if (equipementEntity) {
            equipement = mapEquipementPersistanceToDomain(equipementEntity)
        }
        return mapLeaderPersistanceToDomain(leaderEntityOptional, equipement)
    }
}
