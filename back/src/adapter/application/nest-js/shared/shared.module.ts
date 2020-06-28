import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import { LeaderRepositoryTypeORM } from '../../../repository/type-orm/LeaderRepositoryTypeORM'
import { configORM } from '../../../repository/type-orm/ormconfig'
import AbrisRepositoryTypeORM from '../../../repository/type-orm/AbrisRepositoryTypeORM'

@Module({
    imports: [
        TypeOrmModule.forRoot(configORM),
        TypeOrmModule.forFeature([
            JeuxRepositoryTypeORM,
            JoueurRepositoryTypeORM,
            LeaderRepositoryTypeORM,
            AbrisRepositoryTypeORM,
        ]),
    ],
    exports: [
        TypeOrmModule.forFeature([
            JeuxRepositoryTypeORM,
            JoueurRepositoryTypeORM,
            LeaderRepositoryTypeORM,
            AbrisRepositoryTypeORM,
        ]),
    ],
})
export class SharedModule {}
