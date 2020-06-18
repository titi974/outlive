import {LeaderWeb} from "../jeux/jeux.controller";
import Leader from "../../../../domain/mise-en-place/entity/Leader";

export const mapLeaderDomainToWeb = (leader: Leader): LeaderWeb => {
    return {
        ...leader
    }
}
