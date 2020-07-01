import { EquipementId } from '../valueObject/EquipementId'
import Ressource from './Ressource'
import { Entity } from '../../shared/Entity'

export default class Equipement implements Entity<Equipement>{
    constructor(
        public readonly id: EquipementId, public readonly nom: string,
        public readonly cout: Ressource[], public readonly logo: string,
        public readonly bonus: string, public readonly info: string,
        public readonly reparer: boolean, readonly img: string
    ) {
    }

    sameEntityAs(equipement: Equipement): boolean {
        return this.id.sameValueAs(equipement.id) && this.nom === equipement.nom;
    }
}
