import Joueur from "../../../../domain/mise-en-place/entity/Joueur";
import {JoueurEntity} from "../entity/Joueur.entity";
import {JoueurId} from "../../../../domain/mise-en-place/valueObject/JoueurId";
import {COULEURS} from "../../../../domain/constante/COULEURS";
import {Optional} from "@eastbanctech/ts-optional";

export default class JoueurMapperPersistance {
    mapDomainToPersistance(joueur: Joueur): JoueurEntity {
        const joueurEntity = new JoueurEntity();
        joueurEntity.id = joueur.id.value
        joueurEntity.couleur = joueur.couleur
        joueurEntity.pseudo = joueur.pseudo
        return joueurEntity
    }

    mapPersistanceToDomain(joueurEntity: JoueurEntity): Joueur {
        const joueurId = new JoueurId(joueurEntity.id);
        const joueur = new Joueur(joueurId, COULEURS[joueurEntity.couleur]);
        Optional.ofNullable(joueurEntity.pseudo)
            .ifPresent(pseudo => joueur.ajouterUnPseudo(pseudo))
        return joueur
    }
}
