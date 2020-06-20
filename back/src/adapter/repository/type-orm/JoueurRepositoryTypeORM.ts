import {EntityRepository, Repository} from "typeorm";
import {JoueurEntity} from "./entity/Joueur.entity";
import JoueurRepository from "../../../domain/mise-en-place/port/JoueurRepository";
import Jeux from "../../../domain/mise-en-place/entity/Jeux";
import Joueur from "../../../domain/mise-en-place/entity/Joueur";
import {mapJoueurDomainToPersistance} from "./mapper/JoueurMapperPersistance";

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


}
