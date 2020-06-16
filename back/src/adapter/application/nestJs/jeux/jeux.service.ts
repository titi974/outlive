import {Injectable} from "@nestjs/common";
import {JeuxRepositoryTypeORM} from "../../../repository/type-orm/JeuxRepositoryTypeORM";
import {UUIDGenerator} from "../../../id-generator/UUIDGenerator";
import {JoueurRepositoryTypeORM} from "../../../repository/type-orm/JoueurRepositoryTypeORM";
import makePreparezLeJeux, {PreparezLeJeux} from "../../../../domain/mise-en-place/MakePreparezLeJeux";
import makeAfficherLesJoueursDeLaSession, {AfficherLesJoueurs} from "../../../../domain/mise-en-place/MakeAfficherLesJoueursDeLaSession";
import {JeuxWeb, SessionWeb} from "./jeux.controller";
import * as mapperSession from "../mapper/SessionMapper";
import * as mapperJeux from "../mapper/JeuxMapper"
import Session from "../../../../domain/mise-en-place/valueObject/Session";


@Injectable()
export class JeuxService {

    private readonly creerJeux: PreparezLeJeux
    private readonly afficherLesJoueursDeLaSession: AfficherLesJoueurs

    constructor(
        jeuxRepository: JeuxRepositoryTypeORM,
        joueurRepository: JoueurRepositoryTypeORM,
        uuidGenerator: UUIDGenerator
    ) {
        this.creerJeux = makePreparezLeJeux(jeuxRepository, joueurRepository, uuidGenerator)
        this.afficherLesJoueursDeLaSession = makeAfficherLesJoueursDeLaSession(jeuxRepository)
    }

    async creer(nombre: number): Promise<SessionWeb> {
        const session: Session = await this.creerJeux(nombre)
        return mapperSession.mapDomainToWeb(session)
    }

    async afficherLesJoueurs(numero: string): Promise<JeuxWeb> {
        const jeux = await this.afficherLesJoueursDeLaSession(new Session(numero));
        return mapperJeux.mapDomainToWeb(jeux)
    }
}
