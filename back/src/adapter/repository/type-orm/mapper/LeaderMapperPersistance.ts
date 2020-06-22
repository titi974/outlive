import { LeaderEntity } from '../entity/Leader.entity';
import Leader from '../../../../domain/mise-en-place/entity/Leader';
import LeaderId from '../../../../domain/mise-en-place/valueObject/LeaderId';

export const mapLeaderPersistanceToDomain = (
  leaderEntity: LeaderEntity,
): Leader => {
  const { id, identite, photo, age, profession } = leaderEntity;
  return new Leader(new LeaderId(id), identite, profession, age, photo);
};
