import {Jeux} from '../entity/Jeux'

export interface IJeuxRepository {
    creer: (jeux: Jeux) => Promise<Jeux>
}
