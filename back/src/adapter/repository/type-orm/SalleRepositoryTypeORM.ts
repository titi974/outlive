import { EntityRepository, Repository } from 'typeorm'
import SalleEntity from './entity/Salle.entity'
import { SalleRepository } from '../../../domain/mise-en-place/port/SalleRepository'
import Salle, { TYPES_SALLE } from '../../../domain/mise-en-place/entity/Salle'

@EntityRepository(SalleEntity)
export class SalleRepositoryTypeORM extends Repository<SalleEntity> implements SalleRepository {

    async recupererLesSalles(): Promise<Salle[]> {
        const sallesEntity = await this.find()
        return sallesEntity.map(salleEntity => {
            const { nom, activation, action, combien, entretien, img, info, place, type } = salleEntity
            const typeSalle = type === 'A' ? TYPES_SALLE.AVANCE : TYPES_SALLE.STANDARD
            return new Salle(nom, activation, info, img, action, typeSalle, combien, entretien, place)
        })
    }

}
