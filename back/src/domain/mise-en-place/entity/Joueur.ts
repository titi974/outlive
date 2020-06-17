import {Entity} from "../../shared/Entity";
import {COULEURS} from "../../constante/COULEURS";
import {JoueurId} from "../valueObject/JoueurId";

export default class Joueur implements Entity<Joueur> {

    private monPseudo: string;

    constructor(public readonly id: JoueurId, public readonly couleur: COULEURS) {
    }

    get pseudo(): string{
        return this.monPseudo
    }

    ajouterUnPseudo(pseudo: string){
        this.monPseudo = pseudo
    }

    sameEntityAs(entity: Joueur): boolean {
        return this.id.sameValueAs(entity.id);
    }

}
