import { Injectable } from '@nestjs/common'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'
import { UUIDGenerator } from '../../../id-generator/UUIDGenerator'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import makePreparezLeJeux, { PreparezLeJeux } from '../../../../domain/mise-en-place/MakePreparezLeJeux'
import makeAfficherUnJeux, { AfficherLeJeux } from '../../../../domain/mise-en-place/MakeAfficherLesJoueursDeLaSession'
import { JoueursPseudoCommandWeb, SalleEnregeistrementCommand } from './jeux.controller'
import * as mapperSession from '../mapper/SessionMapper'
import * as mapperJeux from '../mapper/JeuxMapper'
import * as mapperJoueur from '../mapper/JoueurMapper'
import Session from '../../../../domain/mise-en-place/valueObject/Session'
import {
    EnregistrerLesPseudo,
    makeEnregistrerLesPseudo,
} from '../../../../domain/mise-en-place/MakeEnregistrerLesPseudo'
import { JeuxWeb } from '../models/JeuxWeb'
import { SessionWeb } from '../models/SessionWeb'
import {
    EnregistrerLesSalles,
    makeEnregistrerLesSalles,
} from '../../../../domain/mise-en-place/MakeEnregistrerLesSalles'
import { SalleRepositoryTypeORM } from '../../../repository/type-orm/SalleRepositoryTypeORM'
import { JoueurId } from '../../../../domain/mise-en-place/valueObject/JoueurId'
import { SalleId } from '../../../../domain/mise-en-place/valueObject/SalleId'
import AbrisRepositoryTypeORM from '../../../repository/type-orm/AbrisRepositoryTypeORM'

@Injectable()
export class JeuxService {
    private readonly creerJeux: PreparezLeJeux
    private readonly afficherUnJeux: AfficherLeJeux
    private readonly enregistrerLesPseudos: EnregistrerLesPseudo
    private readonly enregistrerLesSalles: EnregistrerLesSalles

    constructor(
        jeuxRepository: JeuxRepositoryTypeORM,
        joueurRepository: JoueurRepositoryTypeORM,
        uuidGenerator: UUIDGenerator,
        sallesRepository: SalleRepositoryTypeORM,
        abrisRepository: AbrisRepositoryTypeORM,
    ) {
        this.creerJeux = makePreparezLeJeux(jeuxRepository, joueurRepository, uuidGenerator)
        this.afficherUnJeux = makeAfficherUnJeux(jeuxRepository)
        this.enregistrerLesPseudos = makeEnregistrerLesPseudo(jeuxRepository, joueurRepository)
        this.enregistrerLesSalles = makeEnregistrerLesSalles(joueurRepository, sallesRepository, abrisRepository)
    }

    async creer(nombre: number): Promise<SessionWeb> {
        const session: Session = await this.creerJeux(nombre)
        return mapperSession.mapDomainToWeb(session)
    }

    async afficherLeJeux(numero: string): Promise<JeuxWeb> {
        const jeux = await this.afficherUnJeux(new Session(numero))
        return mapperJeux.mapDomainToWeb(jeux)
    }

    async enregistrerLesPseudo(joueursPseudoWeb: JoueursPseudoCommandWeb): Promise<JeuxWeb> {
        const joueurs = joueursPseudoWeb.joueurs.map(mapperJoueur.mapJoueurPseudoToDomain)
        const jeux = await this.enregistrerLesPseudos(
            new Session(joueursPseudoWeb.session.numero),
            joueurs,
        )
        return mapperJeux.mapDomainToWeb(jeux)
    }

    async saveRooms(
        numero: string,
        salleEnregeistrementCommand: SalleEnregeistrementCommand,
    ): Promise<void> {
        const session = new Session(numero)
        const joueurId = new JoueurId(salleEnregeistrementCommand.joueurId)
        const salleIds = salleEnregeistrementCommand.salles.map(salleId => new SalleId(salleId))
        await this.enregistrerLesSalles(session, joueurId, salleIds)
    }
}
