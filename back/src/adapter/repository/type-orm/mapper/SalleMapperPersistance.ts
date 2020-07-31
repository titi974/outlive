import Salle, { TYPES_SALLE } from '../../../../domain/mise-en-place/entity/Salle'
import { SalleId } from '../../../../domain/mise-en-place/valueObject/SalleId'
import SalleEntity from '../entity/Salle.entity'

export const mapPersistanceToDomain = (salleEntity: SalleEntity): Salle => {
    const { id, nom, activation, action, combien, entretien, img, info, place, type } = salleEntity
    const typeSalle = type === 'A' ? TYPES_SALLE.AVANCE : TYPES_SALLE.STANDARD
    const salleId = new SalleId(id)
    return new Salle(salleId, nom, activation, info, img, action, typeSalle, combien, entretien, place)
}

export const mapDomainToPersistance = (salle: Salle): SalleEntity => {
    const salleEntity = new SalleEntity()
    salleEntity.id = salle.id.value
    salleEntity.place = salle.place
    salleEntity.entretien = salle.entretien
    salleEntity.combien = salle.combien
    salleEntity.action = salle.action
    salleEntity.type = salle.type
    salleEntity.img = salle.img
    salleEntity.info = salle.info
    salleEntity.nom = salle.nom
    return salleEntity
}
