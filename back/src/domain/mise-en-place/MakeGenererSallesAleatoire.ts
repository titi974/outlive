import JeuxRepository from './port/JeuxRepository'
import { SalleRepository } from './port/SalleRepository'
import Session from './valueObject/Session'
import { JoueurId } from './valueObject/JoueurId'
import Salle, { TYPES_SALLE } from './entity/Salle'
import SessionInexistanteError from './SessionInexistanteError'
import { generationAlleatoire } from './port/GestionAleatoire'

export type GenererSallesAleatoire = (session: Session) => Promise<Map<JoueurId, Salle[]>>
const MakeGenererSallesAleatoire = (
    salleRepository: SalleRepository,
    jeuxRepository: JeuxRepository,
) => async (session: Session): Promise<Map<JoueurId, Salle[]>> => {
    const jeux = (await jeuxRepository.afficherLeJeux(session)).orElseThrow(() => new SessionInexistanteError(session))
    const joueurIds = jeux.joueurs.map(joueur => joueur.id)
    const salles = await salleRepository.recupererLesSalles()
    const sallesAvancees = salles.filter(salle => salle.type === TYPES_SALLE.AVANCE)
    const listeDeSalles = generationAlleatoire(jeux.joueurs.length * 6, salles)
    return
}


export default MakeGenererSallesAleatoire
