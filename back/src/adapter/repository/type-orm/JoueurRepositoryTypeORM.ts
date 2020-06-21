import {EntityRepository, Repository} from "typeorm";
import {JoueurEntity} from "./entity/Joueur.entity";
import JoueurRepository from "../../../domain/mise-en-place/port/JoueurRepository";
import Jeux from "../../../domain/mise-en-place/entity/Jeux";
import Joueur from "../../../domain/mise-en-place/entity/Joueur";
import {mapJoueurDomainToPersistance, mapJoueurPersistanceToDomain} from "./mapper/JoueurMapperPersistance";
import {Optional} from "@eastbanctech/ts-optional";

@EntityRepository(JoueurEntity)
export class JoueurRepositoryTypeORM extends Repository<JoueurEntity> implements JoueurRepository {

    constructor() {
        super()
    }

    async creerDesJoueur(jeux: Jeux): Promise<void> {
        const joueurEntities = jeux.joueurs.map(mapJoueurDomainToPersistance);
        joueurEntities.forEach(j => j.jeuxId = jeux.session.value)
        await this.save(joueurEntities);
    }

    async enregistrerPseudo(joueurs: Joueur[]): Promise<void> {
        const joueurEntities = joueurs.map(mapJoueurDomainToPersistance);
        await this.save(joueurEntities)
    }

    async enregistrer(joueur: Joueur): Promise<void> {
        const joueurEntity = mapJoueurDomainToPersistance(joueur);
        await this.save(joueurEntity)
    }

    async findJoueurById(id: string): Promise<Optional<Joueur>> {
        let joueur: Joueur = null;
        const joueurEntity = await this.findOne(id);
        if(joueurEntity){
            joueur = mapJoueurPersistanceToDomain(joueurEntity);
        }
        return Optional.ofNullable(joueur)
    }

}
