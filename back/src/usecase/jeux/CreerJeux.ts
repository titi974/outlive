import {IGeneratorId} from "../../domain/utils/IGeneratorId";
import {UUIDGenerator} from "../../adapter/id-generator/UUIDGenerator";
import {IJeuxRepository} from "../../domain/jeux/port/IJeuRepository";
import {JeuxDTO} from "../../infra/jeux/JeuxDTO";
import {Jeux} from "../../domain/jeux/entity/Jeux";

export class CreerJeux {
    private generatorId: IGeneratorId = new UUIDGenerator()

    constructor(private readonly repository: IJeuxRepository) {
    }

    executer(jeuxDTO: JeuxDTO): Promise<Jeux> {
        const jeux: Jeux = new Jeux(this.generatorId.execute(), jeuxDTO.nom);
        return this.repository.creer(jeux);
    }
}
