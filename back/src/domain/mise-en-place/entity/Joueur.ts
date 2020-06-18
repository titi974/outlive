import {Entity} from "../../shared/Entity";
import {COULEURS} from "../../constante/COULEURS";
import {JoueurId} from "../valueObject/JoueurId";
import Leader from "./Leader";
import MaximumLeaderAchoisirError from "../error/MaximumLeaderAchoisirError";

export default class Joueur implements Entity<Joueur> {

    private monPseudo: string;
    public readonly leadersAChoisr: Leader[] = []

    constructor(public readonly id: JoueurId, public readonly couleur: COULEURS) {
    }

    get pseudo(): string {
        return this.monPseudo
    }

    ajouterUnPseudo(pseudo: string) {
        this.monPseudo = pseudo
    }

    sameEntityAs(entity: Joueur): boolean {
        return this.id.sameValueAs(entity.id);
    }

    leaderAChoisir(leader: Leader) {
        if (this.leadersAChoisr.length === 2) {
            throw new MaximumLeaderAchoisirError()
        }
        this.leadersAChoisr.push(leader)
    }
}
