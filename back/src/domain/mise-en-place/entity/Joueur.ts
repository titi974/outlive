import {Entity} from "../../shared/Entity";
import {COULEURS} from "../../constante/COULEURS";
import {JoueurId} from "../valueObject/JoueurId";

export default class Joueur implements Entity<Joueur> {

    constructor(public readonly id: JoueurId, public readonly couleur: COULEURS) {
    }

    sameEntityAs(entity: Joueur): boolean {
        return false;
    }

}
