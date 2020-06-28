import { LeaderEntity } from '../entity/Leader.entity'
import Leader from '../../../../domain/mise-en-place/entity/Leader'
import LeaderId from '../../../../domain/mise-en-place/valueObject/LeaderId'
import Ressource from '../../../../domain/mise-en-place/entity/Ressource'

export const mapLeaderPersistanceToDomain = (leaderEntity: LeaderEntity): Leader => {
    const { id, identite, photo, age, profession, ressources } = leaderEntity
    const lesRessources = ressources.map(
        ressource => new Ressource(ressource.name, ressource.quantite),
    )
    return new Leader(new LeaderId(id), identite, profession, age, photo, lesRessources)
}
