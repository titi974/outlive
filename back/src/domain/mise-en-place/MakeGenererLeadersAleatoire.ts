import Leader from './entity/Leader'
import JeuxRepository from './port/JeuxRepository'
import Session from './valueObject/Session'
import SessionInexistanteError from './SessionInexistanteError'
import LeaderRepository from './port/LeaderRepository'
import Joueur from './entity/Joueur'

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
    const nombreDeLeader = leaders.length
    const leaderGenerate: Leader[] = []

    joueurs.forEach((joueur, i) => {
        do {
            const val = Math.floor(Math.random() * Math.floor(nombreDeLeader))
            const leader = leaders[val]
            if (val >= 0 && val < nombreDeLeader && !leaderGenerate.includes(leader)) {
                leaderGenerate.push(leader)
                joueur.leaderAChoisir(leader)
            }
        } while (leaderGenerate.length < (i + 1) * 2)
    })
    return joueurs
}

export default MakeGenererLeadersAleatoire
