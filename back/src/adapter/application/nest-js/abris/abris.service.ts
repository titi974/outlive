import { Injectable } from '@nestjs/common'
import { AbrisCreate } from './abris.controller'
import MakeInitiliserRessourceDAbris, {
    InitAbrisJoueur,
} from '../../../../domain/mise-en-place/MakeInitiliserRessourceDAbris'
import { UUIDGenerator } from '../../../id-generator/UUIDGenerator'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import AbrisRepositoryTypeORM from '../../../repository/type-orm/AbrisRepositoryTypeORM'
import Session from '../../../../domain/mise-en-place/valueObject/Session'
import { JoueurId } from '../../../../domain/mise-en-place/valueObject/JoueurId'
import { AbrisId } from '../../../../domain/mise-en-place/valueObject/AbrisId'

@Injectable()
export class AbrisService {
    private readonly initiliserRessourceDAbris: InitAbrisJoueur

    constructor(
        uuidGenerator: UUIDGenerator,
        joueurRepository: JoueurRepositoryTypeORM,
        abrisRepository: AbrisRepositoryTypeORM,
    ) {
        this.initiliserRessourceDAbris = MakeInitiliserRessourceDAbris(
            uuidGenerator,
            joueurRepository,
            abrisRepository,
        )
    }

    async creerLesAbris(abrisCreate: AbrisCreate): Promise<AbrisId[]> {
        return this.initiliserRessourceDAbris(
            new Session(abrisCreate.session.numero),
            abrisCreate.joueurs.map(joueur => new JoueurId(joueur.id)),
        )
    }
}
