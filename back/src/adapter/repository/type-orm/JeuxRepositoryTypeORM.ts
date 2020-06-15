import {EntityRepository, Repository} from "typeorm";
import {JeuxEntity} from "./entity/Jeux.entity";
import Jeux from "../../../domain/mise-en-place/entity/Jeux";
import JeuxRepository from "../../../domain/mise-en-place/port/JeuxRepository";
import JeuxMapperPersistance from "./mapper/JeuxMapperPersistance";
import JoueurMapperPersistance from "./mapper/JoueurMapperPersistance";

@EntityRepository(JeuxEntity)
export class JeuxRepositoryTypeORM extends Repository<JeuxEntity> implements JeuxRepository {
    private readonly joueurMapper: JoueurMapperPersistance = new JoueurMapperPersistance()
    private readonly jeuxMapper: JeuxMapperPersistance = new JeuxMapperPersistance(this.joueurMapper)

    constructor() {
        super()
    }

    async creer(jeux: Jeux): Promise<void> {
        const jeuxEntity = this.jeuxMapper.mapDomainToPersistance(jeux)
        await this.save(jeuxEntity)
    }

    // async trouverParId(id: IdJeux): Promise<Jeux> {
    // 	const jeuxEntity = await this.findOne(id.value)
    // 	return Promise.resolve(this.jeuxMapper.mapPersitanceToDomain(jeuxEntity))
    // }
    //
    // async isExists(idJeux: IdJeux): Promise<boolean> {
    // 	const compteur = await this.count({ id: idJeux.value })
    // 	return Promise.resolve(!!compteur)
    // }
}
