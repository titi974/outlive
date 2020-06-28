import Jeux from '../entity/Jeux'
import Joueur from '../entity/Joueur'
import { Optional } from '@eastbanctech/ts-optional'
import { JoueurId } from '../valueObject/JoueurId'

export default interface JoueurRepository {
    findJoueurByIds: (joueurIds: JoueurId[]) => Promise<Joueur[]>
    enregistrerPseudo: (joueurs: Joueur[]) => Promise<void>
    creerDesJoueur: (jeux: Jeux) => Promise<void>
    enregistrer: (joueurs: Joueur) => Promise<void>
    findJoueurById: (id: string) => Promise<Optional<Joueur>>
    mettreAJourDesJoueurs: (joueurs: Joueur[]) => Promise<void>
}
