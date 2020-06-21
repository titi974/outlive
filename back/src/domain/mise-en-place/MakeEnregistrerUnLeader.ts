import JeuxRepository from "./port/JeuxRepository";
import JoueurRepository from "./port/JoueurRepository";
import LeaderRepository from "./port/LeaderRepository";
import Session from "./valueObject/Session";
import {JoueurId} from "./valueObject/JoueurId";
import SessionInexistanteError from "./SessionInexistanteError";
import Joueur from "./entity/Joueur";

export type EnregistrerUnLeader = (session: Session, joueurId: JoueurId, leaderNom: string) => Promise<Joueur>

const makeEnregistrerUnLeader = (jeuxRepository: JeuxRepository, joueurRepository: JoueurRepository,
                                 leaderRepository: LeaderRepository) =>
    async (session: Session, joueurId: JoueurId, leaderNom: string): Promise<Joueur> => {
        const jeuxOptional = await jeuxRepository.findJeuxId(session.value);
        if (!jeuxOptional.isPresent()) {
            throw new SessionInexistanteError(session)
        }
        const jeux = jeuxOptional.get();
        const joueur = jeux.joueurs.find(joueur => joueur.id.sameValueAs(joueurId));

        if (!joueur) {
            throw new Error(`joueur numéro: ${joueurId} n'existe pas pour la session: ${session.value}`)
        }

        const leader = await leaderRepository.leaderByNom(leaderNom);

        joueur.ajouterLeader(leader)

        await joueurRepository.enregistrer(joueur)

        return joueur
    }

export default makeEnregistrerUnLeader
