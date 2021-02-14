import { SalleRepository } from './port/SalleRepository'
import JoueurRepository from './port/JoueurRepository'
import Session from './valueObject/Session'
import { JoueurId } from './valueObject/JoueurId'
import { SalleId } from './valueObject/SalleId'
import JoueurInexistantError from './JoueurInexistantError'

export type ConstruireSalle = (session: Session, joueurId: JoueurId, salleIds: SalleId[]) => void
export const makeConstruireSalleDebutPartie = (joueurRepository: JoueurRepository, salleRepository: SalleRepository): ConstruireSalle => async (session: Session, joueurId: JoueurId, salleIds: SalleId[]) => {
    const joueur = (await joueurRepository.findJoueurById(joueurId.value)).orElseThrow(()=> new JoueurInexistantError(joueurId.value))
    const mesSalles = await salleRepository.trouverLesSalles(salleIds)

}
