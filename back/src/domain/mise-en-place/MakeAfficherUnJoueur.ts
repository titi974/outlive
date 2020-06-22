import Joueur from './entity/Joueur';
import JoueurRepository from './port/JoueurRepository';

export type AfficherLeJoueur = (id: string) => Promise<Joueur>;

const makeAfficherUnJoueur = (
  joueurRepository: JoueurRepository,
): AfficherLeJoueur => async (id: string): Promise<Joueur> => {
  const joueurOptional = await joueurRepository.findJoueurById(id);
  if (!joueurOptional.isPresent()) {
    throw new Error('Joueur inconnu');
  }
  return joueurOptional.get();
};

export default makeAfficherUnJoueur;
