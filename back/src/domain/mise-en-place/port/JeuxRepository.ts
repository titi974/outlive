import Jeux from '../entity/Jeux'
import { Optional } from '@eastbanctech/ts-optional'
import Session from '../valueObject/Session'

export default interface JeuxRepository {
    creer: (jeux: Jeux) => Promise<void>
    afficherLeJeux: (id: Session) => Promise<Optional<Jeux>>
}
