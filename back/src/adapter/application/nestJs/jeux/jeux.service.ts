import {Injectable} from "@nestjs/common";
import {JeuxRepositoryTypeORM} from "../../../repository/type-orm/JeuxRepositoryTypeORM";
import {UUIDGenerator} from "../../../id-generator/UUIDGenerator";
import PreparezLeJeux from "../../../../domain/mise-en-place/PreparezLeJeux";


@Injectable()
export class JeuxService {
    private readonly creerJeux: PreparezLeJeux

    constructor(
        jeuxRepository: JeuxRepositoryTypeORM,
        uuidGenerator: UUIDGenerator
    ) {
        this.creerJeux = PreparezLeJeux(jeuxRepository, uuidGenerator)
    }

    async creer(nombre: number): Promise<string> {
        return this.creerJeux(nombre)
    }
}
