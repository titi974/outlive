import { LeaderEntity } from '../entity/Leader.entity'
import Leader from '../../../../domain/mise-en-place/entity/Leader'
import LeaderId from '../../../../domain/mise-en-place/valueObject/LeaderId'
import Ressource from '../../../../domain/mise-en-place/entity/Ressource'
import { mapEquipementPersistanceToDomain } from './EquipementMapperPersistance'

export const mapLeaderPersistanceToDomain = async (
    leaderEntity: LeaderEntity
): Promise<Leader> => {
    const { id, identite, photo, age, profession, ressources } = leaderEntity
    const lesRessources = ressources.map(
        ressource => new Ressource(ressource.name, ressource.quantite),
    )
    const equipement = mapEquipementPersistanceToDomain(await leaderEntity.equipement)
    return new Leader(new LeaderId(id), identite, profession, age, photo, lesRessources, equipement)
}
