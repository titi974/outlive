import Jeux from "../entity/Jeux";

export default interface JoueurRepository {
    creerDesJoueur: (jeux: Jeux) => Promise<void>
}
