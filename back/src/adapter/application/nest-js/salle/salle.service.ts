import { Injectable } from '@nestjs/common'
import { SalleRepositoryTypeORM } from '../../../repository/type-orm/SalleRepositoryTypeORM'
import Salle from '../../../../domain/mise-en-place/entity/Salle'
import { JoueurId } from '../../../../domain/mise-en-place/valueObject/JoueurId'
import Session from '../../../../domain/mise-en-place/valueObject/Session'
import MakeGenererSallesAleatoire, {
    GenererSallesAleatoire,
} from '../../../../domain/mise-en-place/MakeGenererSallesAleatoire'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'

@Injectable()
export class SalleService {
    private generateSallesAlleatoire: GenererSallesAleatoire

    constructor(
        private readonly salleRepositoryTypeORM: SalleRepositoryTypeORM,
        private readonly jeuxRepositoryTypeORM: JeuxRepositoryTypeORM,
    ) {
        this.generateSallesAlleatoire = MakeGenererSallesAleatoire(
            salleRepositoryTypeORM,
            jeuxRepositoryTypeORM,
        )
    }

    async getAll(): Promise<Salle[]> {
        return this.salleRepositoryTypeORM.recupererLesSalles()
    }

    async randomSalleByPlayers(idSession: string): Promise<Map<JoueurId, Salle[]>> {
        const session = new Session(idSession)
        return this.generateSallesAlleatoire(session)
    }
}
