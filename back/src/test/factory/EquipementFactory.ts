import { LeaderEntity } from '../../adapter/repository/type-orm/entity/Leader.entity'
import { starWars, uniqueNamesGenerator } from 'unique-names-generator'
import EquipementEntity from '../../adapter/repository/type-orm/entity/Equipement.entity'

export const FactoryEquipement = (id: number, nom: string): EquipementEntity => {
    const equipementEntity = new EquipementEntity()
    equipementEntity.id = id
    equipementEntity.nom = nom
    equipementEntity.cout = []
    return equipementEntity as EquipementEntity
}
export const FactoryEquipements = (nombre: number): LeaderEntity[] => {
    const equipement = []
    for (let i = 0; i < nombre; i++) {
        equipement.push(
            FactoryEquipement(
                i,
                uniqueNamesGenerator({
                    dictionaries: [starWars],
                    length: 1,
                }),
            ),
        )
    }
    return equipement
}
