import { Entity } from '../../shared/Entity'
import { Column } from 'typeorm'

export enum TYPES_SALLE {
    AVANCE = 'AVANCE',
    STANDARD = 'STANDARD'
}

export default class Salle implements Entity<Salle> {

    constructor(
        public readonly nom: string,
        public readonly activation: string,
        public readonly info: string,
        public readonly img: string,
        public readonly action: string,
        public readonly type: TYPES_SALLE,
        public readonly combien: string,
        public readonly entretien: string,
        public readonly place: number) {
    }

    sameEntityAs(salle: Salle): boolean {
        return this.nom === salle.nom && this.type === salle.type
    }

}
