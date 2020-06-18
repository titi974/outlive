import {EntityRepository, Repository} from "typeorm";
import {LeaderEntity} from "./entity/Leader.entity";
import LeaderRepository from "../../../domain/mise-en-place/port/LeaderRepository";
import Leader from "../../../domain/mise-en-place/entity/Leader";

@EntityRepository(LeaderEntity)
export class LeaderRepositoryTypeORM extends Repository<LeaderEntity> implements LeaderRepository {
    allLeaders(): Promise<Leader[]> {
        return Promise.resolve([]);
    }

}
