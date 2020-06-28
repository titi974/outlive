import Jeux from '../../../../domain/mise-en-place/entity/Jeux'
import { Optional } from '@eastbanctech/ts-optional'
import { JeuxWeb } from '../models/JeuxWeb'
import { JoueurWeb } from '../models/JoueurWeb'
import { LeaderWeb } from '../models/LeaderWeb'

export const mapDomainToWeb = (jeux: Jeux): JeuxWeb => {
    const joueursWeb = [] as JoueurWeb[]

    Optional.ofNullable(jeux.joueurs).ifPresent(joueurs =>
        joueurs.forEach(joueur => {
            let leaderWeb: LeaderWeb | null = null
            Optional.ofNullable(joueur.monLeader).ifPresent(leader => {
                leaderWeb = { ...leader }
            })
            joueursWeb.push({
                id: joueur.id.value,
                couleur: joueur.couleur,
                pseudo: joueur.pseudo,
                leader: leaderWeb,
            })
        }),
    )
    return {
        session: { numero: jeux.session.value },
        nombreJoueur: jeux.nombreDeJoueur,
        dateDebut: jeux.dateDebut.toDateString(),
        joueurs: joueursWeb,
    }
}
