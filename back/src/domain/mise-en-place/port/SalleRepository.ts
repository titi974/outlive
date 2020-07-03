import Salle from '../entity/Salle'

export interface SalleRepository {
    recupererLesSalles: () => Promise<Salle[]>
}
