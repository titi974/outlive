import Jeux from "../entity/Jeux";

export default interface JeuxRepository {
    creer: (jeux: Jeux) => Promise<void>
}
