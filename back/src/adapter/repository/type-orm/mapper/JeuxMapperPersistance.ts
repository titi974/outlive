import Jeux from "../../../../domain/mise-en-place/entity/Jeux";
import {JeuxEntity} from "../entity/Jeux.entity";
import JoueurMapperPersistance from "./JoueurMapperPersistance";

export default class JeuxMapperPersistance {
    constructor(private readonly joueurMapperPersistance: JoueurMapperPersistance) {
    }
    mapDomainToPersistance(jeux: Jeux): JeuxEntity {
        const jeuxEntity = new JeuxEntity();
        jeuxEntity.id = jeux.session.value
        jeuxEntity.dateDebut = jeux.dateDebut
        jeuxEntity.nbreJoueur = jeux.nombreDeJoueur
        // jeuxEntity.joueurs = jeux.joueurs.map(this.joueurMapperPersistance.mapDomainToPersistance)
        return jeuxEntity
    }
}
