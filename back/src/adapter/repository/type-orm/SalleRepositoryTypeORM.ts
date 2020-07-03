import { EntityRepository, Repository } from 'typeorm'
import SalleEntity from './entity/Salle.entity'
import { SalleRepository } from '../../../domain/mise-en-place/port/SalleRepository'
import Salle from '../../../domain/mise-en-place/entity/Salle'

@EntityRepository(SalleEntity)
export class SalleRepositoryTypeORM extends Repository<SalleEntity> implements SalleRepository {

    async recupererLesSalles(): Promise<Salle[]> {
        const sallesEntity = await this.find()
        return sallesEntity.map(salleEntity => {
            const { nom, activation, action, combien, entretien, img, info, place, type } = salleEntity
            return new Salle(nom, activation, info, img, action, type, combien, entretien, place)
        })
    }

}
