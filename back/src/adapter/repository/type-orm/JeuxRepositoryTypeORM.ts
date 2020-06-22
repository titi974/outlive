import { EntityRepository, Repository } from 'typeorm';
import { JeuxEntity } from './entity/Jeux.entity';
import Jeux from '../../../domain/mise-en-place/entity/Jeux';
import JeuxRepository from '../../../domain/mise-en-place/port/JeuxRepository';
import { Optional } from '@eastbanctech/ts-optional';
import {
  mapJeuxDomainToPersistance,
  mapJeuxPersistanceToDomain,
} from './mapper/JeuxMapperPersistance';

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

  async findJeuxId(id: string): Promise<Optional<Jeux>> {
    let jeux: Jeux = null;
    const jeuxEntity = await this.findOne(id);
    if (jeuxEntity) {
      jeux = mapJeuxPersistanceToDomain(jeuxEntity);
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
