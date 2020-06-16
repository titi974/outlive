import Joueur from "../../../../domain/mise-en-place/entity/Joueur";
import {JoueurEntity} from "../entity/Joueur.entity";
import {JoueurId} from "../../../../domain/mise-en-place/valueObject/JoueurId";
import {COULEURS} from "../../../../domain/constante/COULEURS";

export default class JoueurMapperPersistance {
    mapDomainToPersistance(joueur: Joueur): JoueurEntity {
        const joueurEntity = new JoueurEntity();
        joueurEntity.id = joueur.id.value
        joueurEntity.couleur = joueur.couleur
        return joueurEntity
    }

    mapPersistanceToDomain(joueurEntity: JoueurEntity): Joueur {
        const joueurId = new JoueurId(joueurEntity.id);
        return new Joueur(joueurId, COULEURS[joueurEntity.couleur])
    }
}
