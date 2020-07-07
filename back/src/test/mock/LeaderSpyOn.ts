import { LeaderRepositoryTypeORM } from '../../adapter/repository/type-orm/LeaderRepositoryTypeORM'
import { Provider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'

export const providerLeaderRepository = {
    provide: getRepositoryToken(LeaderRepositoryTypeORM),
    useClass: LeaderRepositoryTypeORM
} as Provider
