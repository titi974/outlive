import { getRepositoryToken } from '@nestjs/typeorm'
import { Provider } from '@nestjs/common'
import { SalleRepositoryTypeORM } from '../../adapter/repository/type-orm/SalleRepositoryTypeORM'

export const providerSalleRepository = {
    provide: getRepositoryToken(SalleRepositoryTypeORM),
    useClass: SalleRepositoryTypeORM,
} as Provider
