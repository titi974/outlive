import Jeux from '../entity/Jeux';
import Joueur from '../entity/Joueur';
import { Optional } from '@eastbanctech/ts-optional';

export default interface JoueurRepository {
  enregistrerPseudo: (joueurs: Joueur[]) => Promise<void>;
  creerDesJoueur: (jeux: Jeux) => Promise<void>;
  enregistrer: (joueurs: Joueur) => Promise<void>;
  findJoueurById: (id: string) => Promise<Optional<Joueur>>;
}
