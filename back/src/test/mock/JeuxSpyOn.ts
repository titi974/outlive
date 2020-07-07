import { JeuxRepositoryTypeORM } from '../../adapter/repository/type-orm/JeuxRepositoryTypeORM'
import { Provider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'

export const providerJeuxRepository = {
    provide: getRepositoryToken(JeuxRepositoryTypeORM),
    useClass: JeuxRepositoryTypeORM,
} as Provider
