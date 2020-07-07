import { getRepositoryToken } from '@nestjs/typeorm'
import { JoueurRepositoryTypeORM } from '../../adapter/repository/type-orm/JoueurRepositoryTypeORM'
import { Provider } from '@nestjs/common'

export const providerJoueurRepository = {
    provide: getRepositoryToken(JoueurRepositoryTypeORM),
    useValue: JoueurRepositoryTypeORM,
} as Provider
