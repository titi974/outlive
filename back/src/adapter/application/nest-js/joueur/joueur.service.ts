import { Injectable } from '@nestjs/common'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'
import { LeaderRepositoryTypeORM } from '../../../repository/type-orm/LeaderRepositoryTypeORM'
import makeEnregistrerUnLeader, {
    EnregistrerUnLeader,
} from '../../../../domain/mise-en-place/MakeEnregistrerUnLeader'
import Session from '../../../../domain/mise-en-place/valueObject/Session'
import { JoueurId } from '../../../../domain/mise-en-place/valueObject/JoueurId'
import { mapJoueurDomainToWeb } from '../mapper/JoueurMapper'
import makeAfficherUnJoueur, {
    AfficherLeJoueur,
} from '../../../../domain/mise-en-place/MakeAfficherUnJoueur'
import { JoueurWeb } from '../models/JoueurWeb'
import { SessionWeb } from '../models/SessionWeb'

export type JoueurAddLeaderCommand = {
    joueurId: string
    session: SessionWeb
    leader: string
}

@Injectable()
export class JoueurService {
    private enregistrerLeader: EnregistrerUnLeader
    private afficherUnJoueur: AfficherLeJoueur

    constructor(
        jeuxRepository: JeuxRepositoryTypeORM,
        joueurRepository: JoueurRepositoryTypeORM,
        leaderRepository: LeaderRepositoryTypeORM,
    ) {
        this.enregistrerLeader = makeEnregistrerUnLeader(
            jeuxRepository,
            joueurRepository,
            leaderRepository,
        )
        this.afficherUnJoueur = makeAfficherUnJoueur(joueurRepository)
    }

    async ajouterUnLeader(joueurIdWithLeaderWeb: JoueurAddLeaderCommand): Promise<JoueurWeb> {
        const {
            session: { numero },
            joueurId,
            leader,
        } = joueurIdWithLeaderWeb
        const joueur = await this.enregistrerLeader(
            new Session(numero),
            new JoueurId(joueurId),
            leader,
        )
        return mapJoueurDomainToWeb(joueur)
    }

    async afficherLeJoueurId(id: string): Promise<JoueurWeb> {
        return mapJoueurDomainToWeb(await this.afficherUnJoueur(id))
    }
}
