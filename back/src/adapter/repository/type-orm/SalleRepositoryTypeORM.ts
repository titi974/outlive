import { EntityRepository, Repository } from 'typeorm'
import SalleEntity from './entity/Salle.entity'
import { SalleRepository } from '../../../domain/mise-en-place/port/SalleRepository'
import Salle from '../../../domain/mise-en-place/entity/Salle'
import { SalleId } from '../../../domain/mise-en-place/valueObject/SalleId'
import { mapPersistanceToDomain } from './mapper/SalleMapperPersistance'

@EntityRepository(SalleEntity)
export class SalleRepositoryTypeORM extends Repository<SalleEntity> implements SalleRepository {

    async recupererLesSalles(): Promise<Salle[]> {
        const sallesEntity = await this.find()
        return sallesEntity.map(mapPersistanceToDomain)
    }

    async trouverLesSalles(salleIds: SalleId[]): Promise<Salle[]>{
        const salleEntities = await this.findByIds(salleIds.map(id => id.value))
        return salleEntities.map(mapPersistanceToDomain)
    }
}
