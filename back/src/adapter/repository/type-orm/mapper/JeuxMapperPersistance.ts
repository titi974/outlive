import Jeux from "../../../../domain/mise-en-place/entity/Jeux";
import {JeuxEntity} from "../entity/Jeux.entity";
import JoueurMapperPersistance from "./JoueurMapperPersistance";
import Session from "../../../../domain/mise-en-place/valueObject/Session";
import Joueur from "../../../../domain/mise-en-place/entity/Joueur";

export default class JeuxMapperPersistance {
    constructor(private readonly joueurMapperPersistance: JoueurMapperPersistance) {
    }
    mapDomainToPersistance(jeux: Jeux): JeuxEntity {
        const jeuxEntity = new JeuxEntity();
        jeuxEntity.id = jeux.session.value
        jeuxEntity.dateDebut = jeux.dateDebut
        jeuxEntity.nbreJoueur = jeux.nombreDeJoueur
        jeuxEntity.joueurs = jeux.joueurs.map(this.joueurMapperPersistance.mapDomainToPersistance)
        return jeuxEntity
    }
    mapPersistanceToDomain(jeuxEntity: JeuxEntity): Jeux {
        const session = new Session(jeuxEntity.id);
        const jeux: Jeux = new Jeux(session,jeuxEntity.dateDebut,jeuxEntity.nbreJoueur);
        const joueurs: Joueur[] = jeuxEntity.joueurs.map(this.joueurMapperPersistance.mapPersistanceToDomain)
        jeux.ajouterDesJoueurs(joueurs)
        return jeux
    }
}
