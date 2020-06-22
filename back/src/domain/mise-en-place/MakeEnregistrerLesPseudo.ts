import JeuxRepository from './port/JeuxRepository';
import JoueurRepository from './port/JoueurRepository';
import Session from './valueObject/Session';
import Joueur from './entity/Joueur';
import Jeux from './entity/Jeux';
import { Optional } from '@eastbanctech/ts-optional';
import { JoueurId } from './valueObject/JoueurId';

export type EnregistrerLesPseudo = (
  session: Session,
  joueurs: JoueurPseudo[],
) => Promise<Jeux>;
export type JoueurPseudo = { pseudo: string; joueurId: JoueurId };

const findJoueurPseudo = (joueursPseudo: JoueurPseudo[]) => (
  joueur: Joueur,
): Optional<string> => {
  const joueurPseudo = joueursPseudo.find((jp) =>
    jp.joueurId.sameValueAs(joueur.id),
  );
  return Optional.ofNullable(joueurPseudo.pseudo);
};

export const makeEnregistrerLesPseudo = (
  jeuxRepository: JeuxRepository,
  joueurRepository: JoueurRepository,
) => async (session: Session, joueursPseudo: JoueurPseudo[]): Promise<Jeux> => {
  const jeuxOptional = await jeuxRepository.findJeuxId(session.value);
  if (!jeuxOptional.isPresent()) {
    throw new Error(`La session: ${session.value} n'existe pas`);
  }
  const jeux = jeuxOptional.get();
  const findJoueur = findJoueurPseudo(joueursPseudo);
  jeux.joueurs.forEach((joueur) => {
    const pseudo = findJoueur(joueur).orElseThrow(() => new Error('joueur'));
    joueur.ajouterUnPseudo(pseudo);
  });
  await joueurRepository.enregistrerPseudo(jeux.joueurs);
  return jeux;
};
