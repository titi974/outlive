import { LeaderEntity } from '../../adapter/repository/type-orm/entity/Leader.entity'
import { animals, starWars, uniqueNamesGenerator } from 'unique-names-generator'
import { FactoryEquipement } from './EquipementFactory'

const FactoryLeaderEntity = (id: number, identite: string): LeaderEntity => {
    const leaderEntity = new LeaderEntity()
    leaderEntity.id = id
    leaderEntity.identite = identite
    leaderEntity.equipement = Promise.resolve(FactoryEquipement(1, uniqueNamesGenerator({
        dictionaries: [animals],
        length: 1,
    })))
    leaderEntity.ressources = []
    return leaderEntity
}
export const FactoryLeaders = (nombre: number): LeaderEntity[] => {
    const leaders = []
    for (let i = 0; i < nombre; i++) {
        leaders.push(FactoryLeaderEntity(i, uniqueNamesGenerator({
            dictionaries: [starWars],
            length: 1,
        })))
    }
    return leaders
}
