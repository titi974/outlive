import { IJeuxRepository } from '../../domain/jeux/port/IJeuRepository';
import { Jeux } from '../../domain/jeux/entity/Jeux';
import { Repository } from 'typeorm';
import { JeuxEntity } from '../../infra/jeux/entity/Jeux.entity';

export class JeuxRepository implements IJeuxRepository {

  constructor(private readonly repository: Repository<JeuxEntity>) {
  }

  async creer(jeux: Jeux): Promise<Jeux> {
    return this.repository.save(jeux);
  }

}
