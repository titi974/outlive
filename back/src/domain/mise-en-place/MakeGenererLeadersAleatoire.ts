import Leader from "./entity/Leader";
import JeuxRepository from "./port/JeuxRepository";
import Session from "./valueObject/Session";
import SessionInexistanteError from "./SessionInexistanteError";
import LeaderRepository from "./port/LeaderRepository";

export type GenererLeadersAleatoire = (session: Session) => Promise<Leader[]>

const MakeGenererLeadersAleatoire = (jeuxRepository: JeuxRepository, leadersRepository: LeaderRepository): GenererLeadersAleatoire => async (session: Session): Promise<Leader[]> => {
    const jeuxOptional = await jeuxRepository.findJeuxId(session.value)
    if (!jeuxOptional.isPresent()) {
        new SessionInexistanteError(session)
    }
    const jeux = jeuxOptional.get();
    const leaders: Leader[] = await leadersRepository.allLeaders();
    const nombreDeLeader = leaders.length
    const nombreDeLeaderAGenerer = jeux.nombreDeJoueur * 2
    const leaderGenerate: Leader[] = []

    do {
        const val = Math.floor(Math.random() * Math.floor(nombreDeLeader))
        const leader = leaders[val]
        if (val >= 0 && val < leaders.length && !leaderGenerate.includes(leader)) {
            leaderGenerate.push(leader)
        }
    }
    while (leaderGenerate.length < nombreDeLeaderAGenerer)
    // joueurs.forEach(joueur => {
    //     joueur.leaderAChoisir(leaderGenerate.splice(0, 2))
    // })
    // return joueurs
    return [] as Leader[]
}

export default MakeGenererLeadersAleatoire
