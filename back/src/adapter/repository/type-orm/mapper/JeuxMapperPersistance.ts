import Jeux from "../../../../domain/mise-en-place/entity/Jeux";
import {JeuxEntity} from "../entity/Jeux.entity";

export default class JeuxMapperPersistance {
    mapDomainToPersistance(jeux: Jeux): JeuxEntity {
        const jeuxEntity = new JeuxEntity();
        jeuxEntity.id = jeux.session.value
        jeuxEntity.dateDebut = jeux.dateDebut
        jeuxEntity.nbreJoueur = jeux.nombreDeJoueur
        return jeuxEntity
    }
}
