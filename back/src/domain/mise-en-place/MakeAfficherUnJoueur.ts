import Joueur from './entity/Joueur';
import JoueurRepository from './port/JoueurRepository';
import JoueurInexistantError from "./JoueurInexistantError";

export type AfficherLeJoueur = (id: string) => Promise<Joueur>;

const makeAfficherUnJoueur = (
  joueurRepository: JoueurRepository,
): AfficherLeJoueur => async (id: string): Promise<Joueur> => {
  return (await joueurRepository.findJoueurById(id)).orElseThrow(() => new JoueurInexistantError(id));
};

export default makeAfficherUnJoueur;
