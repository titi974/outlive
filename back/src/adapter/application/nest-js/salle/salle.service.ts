import { Injectable } from '@nestjs/common';
import { SalleRepositoryTypeORM } from '../../../repository/type-orm/SalleRepositoryTypeORM'
import Salle from '../../../../domain/mise-en-place/entity/Salle'

@Injectable()
export class SalleService {
    constructor(private readonly salleRepositoryTypeORM: SalleRepositoryTypeORM) {
    }
    async getAll(): Promise<Salle[]> {
        return this.salleRepositoryTypeORM.recupererLesSalles()
    }
}
