import Session from "../valueObject/Session";
import {Entity} from "../../shared/Entity";

export default class Jeux implements Entity<Jeux>{
    constructor(public readonly session: Session) {
    }

    sameEntityAs(entity: Jeux): boolean {
        return false;
    }
}
