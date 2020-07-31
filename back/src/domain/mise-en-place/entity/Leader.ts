import LeaderId from '../valueObject/LeaderId'
import Ressource from './Ressource'
import Equipement from './Equipement'
import { Entity } from '../../shared/Entity'

export default class Leader implements Entity<Leader> {
    constructor(
        public readonly id: LeaderId,
        public readonly identite: string,
        public readonly profession: string,
        public readonly age: number,
        public readonly photo: string,
        private readonly ressources: Ressource[],
        public readonly equipement: Equipement,
    ) {}

    get lesRessources(): Ressource[] {
        return this.ressources
    }

    sameEntityAs(entity: Leader): boolean {
        return false
    }
}
