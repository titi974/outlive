import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import { LeaderRepositoryTypeORM } from '../../../repository/type-orm/LeaderRepositoryTypeORM'
import { configORM } from '../../../repository/type-orm/ormconfig'
import AbrisRepositoryTypeORM from '../../../repository/type-orm/AbrisRepositoryTypeORM'
import EquipementRepositoryTypeORM from '../../../repository/type-orm/EquipementRepositoryTypeORM'
import { SalleRepositoryTypeORM } from '../../../repository/type-orm/SalleRepositoryTypeORM'

@Module({
    imports: [
        TypeOrmModule.forRoot(configORM),
        TypeOrmModule.forFeature([
            JeuxRepositoryTypeORM,
            JoueurRepositoryTypeORM,
            LeaderRepositoryTypeORM,
            AbrisRepositoryTypeORM,
            EquipementRepositoryTypeORM,
            SalleRepositoryTypeORM,
        ]),
    ],
    exports: [
        TypeOrmModule.forFeature([
            JeuxRepositoryTypeORM,
            JoueurRepositoryTypeORM,
            LeaderRepositoryTypeORM,
            AbrisRepositoryTypeORM,
            EquipementRepositoryTypeORM,
            SalleRepositoryTypeORM,
        ]),
    ],
})
export class SharedModule {}
