import { Injectable } from '@nestjs/common'
import { SalleRepositoryTypeORM } from '../../../repository/type-orm/SalleRepositoryTypeORM'
import Salle from '../../../../domain/mise-en-place/entity/Salle'
import { JoueurId } from '../../../../domain/mise-en-place/valueObject/JoueurId'
import Session from '../../../../domain/mise-en-place/valueObject/Session'
import MakeGenererSallesAleatoire, { GenererSallesAleatoire } from '../../../../domain/mise-en-place/MakeGenererSallesAleatoire'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'
import { SessionWeb } from '../models/SessionWeb'
import {
    ConstruireSalle,
    makeConstruireSalleDebutPartie,
} from '../../../../domain/mise-en-place/MakeConstruireSalleDebutPartie'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import JoueurInexistantError from '../../../../domain/mise-en-place/JoueurInexistantError'
import { SalleId } from '../../../../domain/mise-en-place/valueObject/SalleId'

type salleByJoueur = { joueurId: string, salles: { id: number, construction: boolean }[] }
export type SalleConstruireCommand = {
    salles: salleByJoueur[],
    session: SessionWeb
}

@Injectable()
export class SalleService {
    private generateSallesAlleatoire: GenererSallesAleatoire
    private construireDesSalles: ConstruireSalle

    constructor(
        private readonly salleRepositoryTypeORM: SalleRepositoryTypeORM,
        private readonly jeuxRepositoryTypeORM: JeuxRepositoryTypeORM,
        private readonly joueurRepositoryTypeORM: JoueurRepositoryTypeORM,
    ) {
        this.generateSallesAlleatoire = MakeGenererSallesAleatoire(
            salleRepositoryTypeORM,
            jeuxRepositoryTypeORM,
        )
        this.construireDesSalles = makeConstruireSalleDebutPartie(joueurRepositoryTypeORM, salleRepositoryTypeORM)
    }

    async getAll(): Promise<Salle[]> {
        return this.salleRepositoryTypeORM.recupererLesSalles()
    }

    async randomSalleByPlayers(idSession: string): Promise<Map<JoueurId, Salle[]>> {
        const session = new Session(idSession)
        return this.generateSallesAlleatoire(session)
    }

    async construireSalle(idSession: string, salleConstruireCommand: SalleConstruireCommand): Promise<void> {
        const session = new Session(idSession)
        const updateSalles = salleConstruireCommand.salles.map(async ({ joueurId, salles }) => {
            this.construireDesSalles(session, new JoueurId(joueurId), salles.map(({ id }) => new SalleId(id)))
        })
        await Promise.all(updateSalles)
    }
}
