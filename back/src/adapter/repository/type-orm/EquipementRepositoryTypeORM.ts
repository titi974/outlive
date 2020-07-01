import { EntityRepository, Repository } from 'typeorm'
import EquipementEntity from './entity/Equipement.entity'
import { EquipementRepository } from '../../../domain/mise-en-place/MakeInitiliserRessourceDAbris'
import Joueur from '../../../domain/mise-en-place/entity/Joueur'
import Equipement from '../../../domain/mise-en-place/entity/Equipement'

@EntityRepository(EquipementEntity)
export default class EquipementRepositoryTypeORM extends Repository<EquipementEntity>
    implements EquipementRepository {
    rattacherEquipementsJoueur(joueursEquipement: { joueur: Joueur; equipement: Equipement[] }): Promise<void> {
        return Promise.resolve(undefined);
    }

}
