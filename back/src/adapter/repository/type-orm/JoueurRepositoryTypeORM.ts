import {EntityRepository, Repository} from "typeorm";
import {JoueurEntity} from "./entity/Joueur.entity";
import JoueurRepository from "../../../domain/mise-en-place/port/JoueurRepository";
import Jeux from "../../../domain/mise-en-place/entity/Jeux";
import JoueurMapperPersistance from "./mapper/JoueurMapperPersistance";

@EntityRepository(JoueurEntity)
export class JoueurRepositoryTypeORM extends Repository<JoueurEntity> implements JoueurRepository {
    private readonly joueurMapper: JoueurMapperPersistance = new JoueurMapperPersistance()
    async creerDesJoueur(jeux: Jeux): Promise<void> {
        const joueurEntities = jeux.joueurs.map(this.joueurMapper.mapDomainToPersistance);
        joueurEntities.forEach(j => j.jeuxId = jeux.session.value)
        await this.save(joueurEntities);
    }


}
