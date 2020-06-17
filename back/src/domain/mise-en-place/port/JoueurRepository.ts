import Jeux from "../entity/Jeux";
import Joueur from "../entity/Joueur";

export default interface JoueurRepository {
    enregistrerPseudo: (joueurs: Joueur[]) => Promise<void>;
    creerDesJoueur: (jeux: Jeux) => Promise<void>
}
