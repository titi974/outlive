import Joueur from "../../../../domain/mise-en-place/entity/Joueur";
import {JoueurEntity} from "../entity/Joueur.entity";

export default class JoueurMapperPersistance {
    mapDomainToPersistance(joueur: Joueur): JoueurEntity {
        const joueurEntity = new JoueurEntity();
        joueurEntity.id = joueur.id.value
        joueurEntity.couleur = joueur.couleur
        return joueurEntity
    }
}
