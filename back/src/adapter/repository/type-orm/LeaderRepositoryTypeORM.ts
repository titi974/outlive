import { EntityRepository, Repository } from 'typeorm';
import { LeaderEntity } from './entity/Leader.entity';
import LeaderRepository from '../../../domain/mise-en-place/port/LeaderRepository';
import Leader from '../../../domain/mise-en-place/entity/Leader';
import { Optional } from '@eastbanctech/ts-optional';
import LeaderId from '../../../domain/mise-en-place/valueObject/LeaderId';

const mapLeaderPersistanceToDomain = (leaderEntity: LeaderEntity): Leader => {
  const { id, identite, age, photo, profession } = leaderEntity;
  return new Leader(new LeaderId(id), identite, profession, age, photo);
};

@EntityRepository(LeaderEntity)
export class LeaderRepositoryTypeORM extends Repository<LeaderEntity>
  implements LeaderRepository {
  async allLeaders(): Promise<Leader[]> {
    const leaderEntities = Optional.ofNullable(await this.find()).orElseThrow(
      () => new Error('Aucun leader'),
    );
    return leaderEntities.map(mapLeaderPersistanceToDomain);
  }

  async leaderByNom(leaderNom: string): Promise<Leader> {
    const leaderEntityOptional = Optional.ofNullable(
      await this.findOne({ identite: leaderNom }),
    ).orElseThrow(() => new Error('Aucun leader'));
    return mapLeaderPersistanceToDomain(leaderEntityOptional);
  }
}
