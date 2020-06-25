import Jeux from '../../../../domain/mise-en-place/entity/Jeux';
import { JeuxEntity } from '../entity/Jeux.entity';
import Session from '../../../../domain/mise-en-place/valueObject/Session';

export const mapJeuxDomainToPersistance = (jeux: Jeux): JeuxEntity => {
  const jeuxEntity = new JeuxEntity();
  jeuxEntity.id = jeux.session.value;
  jeuxEntity.dateDebut = jeux.dateDebut;
  jeuxEntity.nbreJoueur = jeux.nombreDeJoueur;
  return jeuxEntity;
};

export const mapJeuxPersistanceToDomain = (jeuxEntity: JeuxEntity): Jeux => {
  const session = new Session(jeuxEntity.id);
  return new Jeux(
    session,
    jeuxEntity.dateDebut,
    jeuxEntity.nbreJoueur,
  );
};
