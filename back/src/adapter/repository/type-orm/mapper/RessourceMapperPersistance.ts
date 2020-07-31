import Ressource from '../../../../domain/mise-en-place/entity/Ressource'
import { ressourcesEntity } from '../entity/Leader.entity'

export const mapRessourcePersistanceToDomain = (ressourceEntity: ressourcesEntity): Ressource => {
    return new Ressource(ressourceEntity.name, ressourceEntity.quantite)
}
