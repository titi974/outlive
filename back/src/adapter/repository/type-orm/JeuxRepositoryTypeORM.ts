import { EntityRepository, Repository } from 'typeorm';
import { JeuxEntity } from './entity/Jeux.entity';
import Jeux from '../../../domain/mise-en-place/entity/Jeux';
import JeuxRepository from '../../../domain/mise-en-place/port/JeuxRepository';
import { Optional } from '@eastbanctech/ts-optional';
import {
  mapJeuxDomainToPersistance,
  mapJeuxPersistanceToDomain,
} from './mapper/JeuxMapperPersistance';
import Session from '../../../domain/mise-en-place/valueObject/Session';
import { mapJoueurPersistanceToDomain } from './mapper/JoueurMapperPersistance'
import { mapLeaderPersistanceToDomain } from './mapper/LeaderMapperPersistance'

@EntityRepository(JeuxEntity)
export class JeuxRepositoryTypeORM extends Repository<JeuxEntity>
  implements JeuxRepository {
  constructor() {
    super();
  }

  async creer(jeux: Jeux): Promise<void> {
    const jeuxEntity = mapJeuxDomainToPersistance(jeux);
    await this.save(jeuxEntity);
  }

  async afficherLeJeux(id: Session): Promise<Optional<Jeux>> {
    let jeux: Jeux = null;
    const jeuxEntity = await this.findOne(id.value);
    if (jeuxEntity) {
      jeux = mapJeuxPersistanceToDomain(jeuxEntity);
      const joueurEntities = await jeuxEntity.joueurs
      const joueursPromise = joueurEntities.map(async joueurEntitie => {
        const joueur = mapJoueurPersistanceToDomain(joueurEntitie)
        const leaderEntity = await joueurEntitie.leader
        if(leaderEntity) {
          joueur.ajouterLeader(mapLeaderPersistanceToDomain(leaderEntity))
        }
        return joueur
      })
      const joueurs = await Promise.all(joueursPromise)
      jeux.ajouterDesJoueurs(joueurs)
    }
    return Optional.ofNullable(jeux);
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
