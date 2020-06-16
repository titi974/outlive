import {JeuxWeb, JoueurWeb} from "../jeux/jeux.controller";
import Jeux from "../../../../domain/mise-en-place/entity/Jeux";

export const mapDomainToWeb = (jeux: Jeux): JeuxWeb => {
    return {
        session: {numero: jeux.session.value},
        nombreJoueur: jeux.nombreDeJoueur,
        dateDebut: jeux.dateDebut.toDateString(),
        joueurs: jeux.joueurs.map(joueur => ({
            id: joueur.id.value,
            couleur: joueur.couleur
        }))
    }
}
