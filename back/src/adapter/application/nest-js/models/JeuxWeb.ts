import { JoueurWeb } from './JoueurWeb'
import { SessionWeb } from './SessionWeb'

export type JeuxWeb = {
    session?: SessionWeb
    dateDebut?: string
    nombreJoueur?: number
    joueurs?: JoueurWeb[]
}
