import AbrisRepository from '../../../domain/mise-en-place/port/AbrisRepository'
import Abris from '../../../domain/mise-en-place/entity/Abris'
import { EntityRepository, Repository } from 'typeorm'
import { AbrisEntity } from './entity/Abris.entity'

@EntityRepository(AbrisEntity)
export default class AbrisRepositoryTypeORM extends Repository<AbrisEntity>
    implements AbrisRepository {
    async enregistrerDesAbris(abris: Abris[]): Promise<void> {
        const abrisEnties: AbrisEntity[] = abris.map(abris => {
            const abrisEntity = new AbrisEntity()
            abrisEntity.id = abris.id.value
            abrisEntity.ressources = abris.mesRessources.map(ressource => ({
                name: ressource.nom,
                quantite: ressource.quantite,
            }))
            return abrisEntity
        })
        await this.save(abrisEnties)
    }
}
