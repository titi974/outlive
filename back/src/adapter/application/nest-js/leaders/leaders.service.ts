import { Injectable } from '@nestjs/common'
import { LeaderRepositoryTypeORM } from '../../../repository/type-orm/LeaderRepositoryTypeORM'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'
import MakeGenererLeadersAleatoire, {
    GenererLeadersAleatoire,
} from '../../../../domain/mise-en-place/MakeGenererLeadersAleatoire'
import Session from '../../../../domain/mise-en-place/valueObject/Session'
import { mapJoueurDomainToWeb } from '../mapper/JoueurMapper'
import { JoueurWeb } from '../models/JoueurWeb'
import { SessionWeb } from '../models/SessionWeb'

@Injectable()
export class LeadersService {
    private readonly makeGenererLeadersAleatoire: GenererLeadersAleatoire

    constructor(jeuxRepository: JeuxRepositoryTypeORM, leaderRepository: LeaderRepositoryTypeORM) {
        this.makeGenererLeadersAleatoire = MakeGenererLeadersAleatoire(
            jeuxRepository,
            leaderRepository,
        )
    }

    async leaderRandomByJoueur(session: SessionWeb): Promise<JoueurWeb[]> {
        const joueurs = await this.makeGenererLeadersAleatoire(new Session(session.numero))
        return joueurs.map(mapJoueurDomainToWeb)
    }
}
