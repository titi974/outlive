import {JoueurPseudoWeb} from "../jeux/jeux.controller";
import {JoueurId} from "../../../../domain/mise-en-place/valueObject/JoueurId";
import {JoueurPseudo} from "../../../../domain/mise-en-place/MakeEnregistrerLesPseudo";

export const mapJoueurPseudoToDomain = (joueurWeb: JoueurPseudoWeb): JoueurPseudo => {
    return {joueurId: new JoueurId(joueurWeb.id), pseudo: joueurWeb.pseudo}
}
