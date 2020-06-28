import Leader from '../../../../domain/mise-en-place/entity/Leader'
import { LeaderWeb } from '../models/LeaderWeb'

export const mapLeaderDomainToWeb = (leader: Leader): LeaderWeb => {
    return {
        ...leader,
    }
}
