import LeaderId from '../valueObject/LeaderId'
import Ressource from './Ressource'

export default class Leader {
    constructor(
        public readonly id: LeaderId,
        public readonly identite: string,
        public readonly profession: string,
        public readonly age: number,
        public readonly photo: string,
        private readonly ressources: Ressource[],
    ) {}

    get lesRessources(): Ressource[] {
        return this.ressources
    }
}
