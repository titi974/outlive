import {EntityRepository, Repository} from "typeorm";
import {LeaderEntity} from "./entity/Leader.entity";
import LeaderRepository from "../../../domain/mise-en-place/port/LeaderRepository";
import Leader from "../../../domain/mise-en-place/entity/Leader";
import {Optional} from "@eastbanctech/ts-optional";

const mapLeaderPersistanceToDomain = (leaderEntity: LeaderEntity): Leader => {
    const {id, ...leaderDomain} = leaderEntity
    return {...leaderDomain}
}

@EntityRepository(LeaderEntity)
export class LeaderRepositoryTypeORM extends Repository<LeaderEntity> implements LeaderRepository {
    async allLeaders(): Promise<Leader[]> {
        const leaderEntities = Optional.ofNullable(await this.find()).orElseThrow(() => new Error('Aucun leader'));
        return leaderEntities.map(mapLeaderPersistanceToDomain);
    }

}
