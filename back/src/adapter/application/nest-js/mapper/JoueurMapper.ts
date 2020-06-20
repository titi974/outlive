import {JoueurPseudoWeb, JoueurWeb, LeaderWeb} from "../jeux/jeux.controller";
import {JoueurId} from "../../../../domain/mise-en-place/valueObject/JoueurId";
import {JoueurPseudo} from "../../../../domain/mise-en-place/MakeEnregistrerLesPseudo";
import Joueur from "../../../../domain/mise-en-place/entity/Joueur";
import {Optional} from "@eastbanctech/ts-optional";
import {mapLeaderDomainToWeb} from "./LeaderMapper";

export const mapJoueurPseudoToDomain = (joueurWeb: JoueurPseudoWeb): JoueurPseudo => {
    return {joueurId: new JoueurId(joueurWeb.id), pseudo: joueurWeb.pseudo}
}

export const mapJoueurDomainToWeb = (joueur: Joueur): JoueurWeb => {
    const leadersWeb: LeaderWeb[] = []
    Optional.ofNullable(joueur.leadersAChoisr).ifPresent(leaders =>
        leaders.forEach(leader => {
            leadersWeb.push(mapLeaderDomainToWeb(leader))
        })
    )
    let leader: LeaderWeb | null = null
    Optional.ofNullable(joueur.monLeader).ifPresent(monLeader => {
        leader = monLeader
    })
    return {
        id: joueur.id.value,
        pseudo: joueur.pseudo,
        couleur: joueur.couleur,
        leaderAChoisir: leadersWeb,
        leader: leader
    }
}
