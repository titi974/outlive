import JeuxRepository from "./port/JeuxRepository";
import {UUIDGenerator} from "../../adapter/id-generator/UUIDGenerator";
import Jeux from "./entity/Jeux";
import Session from "./valueObject/Session";
import {COULEURS} from "../constante/COULEURS";
import Joueur from "./entity/Joueur";
import {JoueurId} from "./valueObject/JoueurId";
import JoueurRepository from "./port/JoueurRepository";

export type PreparezLeJeux = (nombre: number) => Promise<Session>

const getRandomInt = (max: number, couleursDejaPrise: number[]): number => {
    let val: number
    do {
        val = Math.floor(Math.random() * Math.floor(max));
    } while (!!couleursDejaPrise.find(c => val === c))
    return val
}

const makePreparezLeJeux = (jeuxRepository: JeuxRepository,
                            joueurRepository: JoueurRepository,
                            uuidGenerator: UUIDGenerator): PreparezLeJeux =>
    async (nombreJoueur: number): Promise<Session> => {
        const session = new Session(uuidGenerator.execute());
        const jeux = new Jeux(session, new Date(), nombreJoueur);

        let i = 0
        const joueurs: Joueur[] = []
        const couleursDejaPrise: number[] = []
        do {
            const numero = getRandomInt(4, couleursDejaPrise);
            const idJoueur = new JoueurId(uuidGenerator.execute());
            couleursDejaPrise.push(numero)
            joueurs.push(new Joueur(idJoueur, Object.values(COULEURS)[numero]))
            i++
        } while (i < nombreJoueur)

        jeux.ajouterDesJoueurs(joueurs)
        await jeuxRepository.creer(jeux)
        await joueurRepository.creerDesJoueur(jeux)
        return session
    }

export default makePreparezLeJeux

