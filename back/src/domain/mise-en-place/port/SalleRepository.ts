import Salle from '../entity/Salle'
import { SalleId } from '../valueObject/SalleId'

export interface SalleRepository {
    recupererLesSalles():Promise<Salle[]>
    trouverLesSalles(salleId: SalleId[]): Promise<Salle[]>
}
