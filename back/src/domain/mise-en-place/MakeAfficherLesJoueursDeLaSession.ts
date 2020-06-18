import JeuxRepository from "./port/JeuxRepository";
import Jeux from "./entity/Jeux";
import Session from "./valueObject/Session";
import SessionInexistanteError from "./SessionInexistanteError";

export type AfficherLesJoueurs = (session: Session) => Promise<Jeux>

const makeAfficherLesJoueursDeLaSession = (jeuxRepository: JeuxRepository): AfficherLesJoueurs => async (session: Session): Promise<Jeux> => {
    const jeuxOptional = await jeuxRepository.findJeuxId(session.value);
    if(!jeuxOptional.isPresent()){
        new SessionInexistanteError(session)
    }
    return Promise.resolve(jeuxOptional.get())
}

export default makeAfficherLesJoueursDeLaSession
