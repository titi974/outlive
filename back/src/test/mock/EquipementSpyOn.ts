import { getRepositoryToken } from '@nestjs/typeorm'
import { Provider } from '@nestjs/common'
import EquipementRepositoryTypeORM from '../../adapter/repository/type-orm/EquipementRepositoryTypeORM'

export const providerEquipementRepository = {
    provide: getRepositoryToken(EquipementRepositoryTypeORM),
    useClass: EquipementRepositoryTypeORM,
} as Provider
