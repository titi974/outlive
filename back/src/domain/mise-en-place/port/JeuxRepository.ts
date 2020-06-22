import Jeux from '../entity/Jeux';
import { Optional } from '@eastbanctech/ts-optional';

export default interface JeuxRepository {
  creer: (jeux: Jeux) => Promise<void>;
  findJeuxId: (id: string) => Promise<Optional<Jeux>>;
}
