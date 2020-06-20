import {Injectable} from '@nestjs/common';
import {JoueurRepositoryTypeORM} from "../../../repository/type-orm/JoueurRepositoryTypeORM";
import {JeuxRepositoryTypeORM} from "../../../repository/type-orm/JeuxRepositoryTypeORM";
import {LeaderRepositoryTypeORM} from "../../../repository/type-orm/LeaderRepositoryTypeORM";
import MakeEnregistrerUnLeader, {EnregistrerUnLeader} from "../../../../domain/mise-en-place/MakeEnregistrerUnLeader";
import {JoueurWeb, SessionWeb} from "../jeux/jeux.controller";
import Session from "../../../../domain/mise-en-place/valueObject/Session";
import {JoueurId} from "../../../../domain/mise-en-place/valueObject/JoueurId";
import {mapJoueurDomainToWeb} from "../mapper/JoueurMapper";

export type JoueurAddLeaderCommand = { joueurId: string, session: SessionWeb, leader: string }

@Injectable()
export class JoueurService {
    private enregistrerLeader: EnregistrerUnLeader

    constructor(jeuxRepository: JeuxRepositoryTypeORM,
                joueurRepository: JoueurRepositoryTypeORM,
                leaderRepository: LeaderRepositoryTypeORM) {
        this.enregistrerLeader = MakeEnregistrerUnLeader(jeuxRepository, joueurRepository, leaderRepository)
    }

    async enregistrer(joueurIdWithLeaderWeb: JoueurAddLeaderCommand): Promise<JoueurWeb> {
        const {session: {numero}, joueurId, leader} = joueurIdWithLeaderWeb;
        const joueur = await this.enregistrerLeader(new Session(numero), new JoueurId(joueurId), leader);
        return mapJoueurDomainToWeb(joueur)
    }

}
