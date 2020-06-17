import {EntityRepository, Repository} from "typeorm";
import {JoueurEntity} from "./entity/Joueur.entity";
import JoueurRepository from "../../../domain/mise-en-place/port/JoueurRepository";
import Jeux from "../../../domain/mise-en-place/entity/Jeux";
import JoueurMapperPersistance from "./mapper/JoueurMapperPersistance";
import Joueur from "../../../domain/mise-en-place/entity/Joueur";

@EntityRepository(JoueurEntity)
export class JoueurRepositoryTypeORM extends Repository<JoueurEntity> implements JoueurRepository {
    private readonly joueurMapper: JoueurMapperPersistance = new JoueurMapperPersistance()
    async creerDesJoueur(jeux: Jeux): Promise<void> {
        const joueurEntities = jeux.joueurs.map(this.joueurMapper.mapDomainToPersistance);
        joueurEntities.forEach(j => j.jeuxId = jeux.session.value)
        await this.save(joueurEntities);
    }

    async enregistrerPseudo(joueurs: Joueur[]): Promise<void> {
        const joueurEntities = joueurs.map(this.joueurMapper.mapDomainToPersistance);
        await this.save(joueurEntities)
    }


}
