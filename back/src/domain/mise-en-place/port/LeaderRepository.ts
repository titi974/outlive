import Leader from "../entity/Leader";

export default interface LeaderRepository {
    allLeaders: () => Promise<Leader[]>
}
