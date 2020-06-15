import {Injectable} from "@nestjs/common";
import {JeuxRepositoryTypeORM} from "../../../repository/type-orm/JeuxRepositoryTypeORM";
import {UUIDGenerator} from "../../../id-generator/UUIDGenerator";
import PreparezLeJeux from "../../../../domain/mise-en-place/PreparezLeJeux";
import {JoueurRepositoryTypeORM} from "../../../repository/type-orm/JoueurRepositoryTypeORM";


@Injectable()
export class JeuxService {
    private readonly creerJeux: PreparezLeJeux

    constructor(
        jeuxRepository: JeuxRepositoryTypeORM,
        joueurRepository: JoueurRepositoryTypeORM,
        uuidGenerator: UUIDGenerator
    ) {
        this.creerJeux = PreparezLeJeux(jeuxRepository, joueurRepository, uuidGenerator)
    }

    async creer(nombre: number): Promise<string> {
        return this.creerJeux(nombre)
    }
}
