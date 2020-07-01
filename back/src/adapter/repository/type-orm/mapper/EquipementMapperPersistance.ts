import EquipementEntity from '../entity/Equipement.entity'
import Equipement from '../../../../domain/mise-en-place/entity/Equipement'
import { EquipementId } from '../../../../domain/mise-en-place/valueObject/EquipementId'
import Ressource from '../../../../domain/mise-en-place/entity/Ressource'

export const mapEquipementPersistanceToDomain = (equipementEntity: EquipementEntity): Equipement => {
    const { id, bonus, cout, img, info, logo, nom, reparer } = equipementEntity
    const idEquipement = new EquipementId(id)
    return new Equipement(idEquipement, nom, cout.map(eqp => new Ressource(eqp.name, eqp.quantite)), logo, bonus, info, reparer, img)
}
