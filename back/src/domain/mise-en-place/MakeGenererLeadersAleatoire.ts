import Leader from './entity/Leader'
import JeuxRepository from './port/JeuxRepository'
import Session from './valueObject/Session'
import SessionInexistanteError from './SessionInexistanteError'
import LeaderRepository from './port/LeaderRepository'
import Joueur from './entity/Joueur'
import { generationAlleatoire } from './port/GestionAleatoire'

export type GenererLeadersAleatoire = (session: Session) => Promise<Joueur[]>

const MakeGenererLeadersAleatoire = (
    jeuxRepository: JeuxRepository,
    leadersRepository: LeaderRepository,
): GenererLeadersAleatoire => async (session: Session): Promise<Joueur[]> => {
    const jeux = (await jeuxRepository.afficherLeJeux(session)).orElseThrow(
        () => new SessionInexistanteError(session),
    )
    const { joueurs } = jeux
    const leaders: Leader[] = await leadersRepository.allLeaders()
    const leadersAleatoire = generationAlleatoire(joueurs.length * 2, leaders)
    joueurs.forEach(joueur => {
        leadersAleatoire.splice(0, 2)
            .forEach(joueur.leaderAChoisir.bind(joueur))
    })
    return joueurs
}

export default MakeGenererLeadersAleatoire
