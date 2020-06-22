import Leader from '../entity/Leader';

export default interface LeaderRepository {
  allLeaders: () => Promise<Leader[]>;
  leaderByNom: (leaderNom: string) => Promise<Leader>;
}
