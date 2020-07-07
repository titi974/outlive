import { getRepositoryToken } from '@nestjs/typeorm'
import AbrisRepositoryTypeORM from '../../adapter/repository/type-orm/AbrisRepositoryTypeORM'
import { Provider } from '@nestjs/common'

export const providerAbrisRepository = {
    provide: getRepositoryToken(AbrisRepositoryTypeORM),
    useClass: AbrisRepositoryTypeORM,
} as Provider
