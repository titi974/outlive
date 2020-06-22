import Session from '../valueObject/Session';
import { Entity } from '../../shared/Entity';
import Joueur from './Joueur';

export default class Jeux implements Entity<Jeux> {
  public readonly joueurs: Joueur[] = [];

  constructor(
    public readonly session: Session,
    public readonly dateDebut: Date,
    public readonly nombreDeJoueur: number,
  ) {}

  ajouterDesJoueurs(joueur: Joueur[]) {
    this.joueurs.push(...joueur);
  }

  sameEntityAs(entity: Jeux): boolean {
    return false;
  }
}
