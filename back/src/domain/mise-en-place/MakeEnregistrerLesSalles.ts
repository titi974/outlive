import Session from './valueObject/Session'
import { JoueurId } from './valueObject/JoueurId'
import { SalleRepository } from './port/SalleRepository'
import JoueurRepository from './port/JoueurRepository'
import { SalleId } from './valueObject/SalleId'
import JoueurInexistantError from './JoueurInexistantError'
import AbrisRepository from './port/AbrisRepository'

export type EnregistrerLesSalles = (
    session: Session,
    joueurId: JoueurId,
    sallesId: SalleId[],
) => Promise<void>

export const makeEnregistrerLesSalles = (joueurRepository: JoueurRepository, sallesRepository: SalleRepository,
                                         abrisRepository: AbrisRepository): EnregistrerLesSalles =>
    async (session: Session, joueurId: JoueurId, sallesId: SalleId[]): Promise<void> => {
        const joueur = (await joueurRepository.findJoueurById(joueurId.value))
            .orElseThrow(() => new JoueurInexistantError(joueurId.value))
        const salles = await sallesRepository.trouverLesSalles(sallesId)
        joueur.monAbris.ajouterLesSalles(salles)
        await abrisRepository.enregistrerDesAbris([joueur.monAbris])
        // sallesRepository.enregistrer
        return Promise.resolve()
    }
