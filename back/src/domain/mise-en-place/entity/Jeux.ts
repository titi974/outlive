import Session from "../valueObject/Session";
import {Entity} from "../../shared/Entity";

export default class Jeux implements Entity<Jeux>{
    constructor(public readonly session: Session, public readonly dateDebut: Date, public readonly nombreDeJoueur: number) {
    }

    sameEntityAs(entity: Jeux): boolean {
        return false;
    }
}
