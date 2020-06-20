import {JeuxWeb, JoueurWeb, LeaderWeb} from "../jeux/jeux.controller";
import Jeux from "../../../../domain/mise-en-place/entity/Jeux";
import {Optional} from "@eastbanctech/ts-optional";

export const mapDomainToWeb = (jeux: Jeux): JeuxWeb => {
    const joueursWeb = [] as JoueurWeb[]

    Optional.ofNullable(jeux.joueurs).ifPresent(joueurs =>
        joueurs.forEach(joueur => {
                let leaderWeb: LeaderWeb | null = null
                Optional.ofNullable(joueur.monLeader).ifPresent(leader => {
                    leaderWeb = {...leader}
                })
                joueursWeb.push({
                    id: joueur.id.value,
                    couleur: joueur.couleur,
                    pseudo: joueur.pseudo,
                    leader: leaderWeb
                })
            }
        )
    )
    return {
        session: {numero: jeux.session.value},
        nombreJoueur: jeux.nombreDeJoueur,
        dateDebut: jeux.dateDebut.toDateString(),
        joueurs: joueursWeb
    }
}
