import EquipementEntity from '../entity/Equipement.entity'
import Equipement from '../../../../domain/mise-en-place/entity/Equipement'
import { EquipementId } from '../../../../domain/mise-en-place/valueObject/EquipementId'
import Ressource from '../../../../domain/mise-en-place/entity/Ressource'
import { RESSOURCES } from '../../../../domain/constante/RESSOURCES'

export const mapEquipementPersistanceToDomain = (
    equipementEntity: EquipementEntity,
): Equipement => {
    const { id, bonus, cout, img, info, logo, nom, reparer } = equipementEntity
    const idEquipement = new EquipementId(id)
    return new Equipement(
        idEquipement,
        nom,
        cout.map(eqp => new Ressource(eqp.name, eqp.quantite)),
        logo,
        bonus,
        info,
        reparer,
        img,
    )
}

export const mapEquipementDomainToPersistance = (equipement: Equipement): EquipementEntity => {
    const equipementEntity = new EquipementEntity()
    equipementEntity.id = equipement.id.value
    equipementEntity.nom = equipement.nom
    equipementEntity.img = equipement.img
    equipementEntity.reparer = equipement.reparer
    equipementEntity.bonus = equipement.bonus
    equipementEntity.info = equipement.info
    equipementEntity.cout = equipement.cout.map(({ nom, quantite }) => ({ name: nom, quantite }))

    return equipementEntity
}
