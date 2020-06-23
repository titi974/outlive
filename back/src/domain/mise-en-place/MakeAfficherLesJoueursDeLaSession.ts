import JeuxRepository from './port/JeuxRepository';
import Jeux from './entity/Jeux';
import Session from './valueObject/Session';
import SessionInexistanteError from './SessionInexistanteError';

export type AfficherLeJeux = (session: Session) => Promise<Jeux>;

const makeAfficherLesJoueursDeLaSession = (
  jeuxRepository: JeuxRepository,
): AfficherLeJeux => async (session: Session): Promise<Jeux> => {
  return (await jeuxRepository.findJeuxId(session)).orElseThrow(
    () => new SessionInexistanteError(session),
  );
};

export default makeAfficherLesJoueursDeLaSession;
