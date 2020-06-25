import Joueur from '../../../../domain/mise-en-place/entity/Joueur';
import { JoueurEntity } from '../entity/Joueur.entity';
import { JoueurId } from '../../../../domain/mise-en-place/valueObject/JoueurId';
import { COULEURS } from '../../../../domain/constante/COULEURS';
import { Optional } from '@eastbanctech/ts-optional'

export const mapJoueurDomainToPersistance = (joueur: Joueur): JoueurEntity => {
  const joueurEntity = new JoueurEntity();
  joueurEntity.id = joueur.id.value;
  joueurEntity.couleur = joueur.couleur;
  joueurEntity.pseudo = joueur.pseudo;
  joueurEntity.leaderId = null;
  Optional.ofNullable(joueur.monLeader).ifPresent(
    (leader) => (joueurEntity.leaderId = leader.id.value),
  );
  return joueurEntity;
};

export const mapJoueurPersistanceToDomain = (
  joueurEntity: JoueurEntity,
): Joueur => {
  const joueurId = new JoueurId(joueurEntity.id);
  return  new Joueur(joueurId, COULEURS[joueurEntity.couleur]);
};
