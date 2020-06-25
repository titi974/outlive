import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JeuxRepositoryTypeORM } from '../../../repository/type-orm/JeuxRepositoryTypeORM'
import { JoueurRepositoryTypeORM } from '../../../repository/type-orm/JoueurRepositoryTypeORM'
import { LeaderRepositoryTypeORM } from '../../../repository/type-orm/LeaderRepositoryTypeORM'

@Module({
    imports:[
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            JeuxRepositoryTypeORM,
            JoueurRepositoryTypeORM,
            LeaderRepositoryTypeORM
        ])
    ],
    exports:[
        TypeOrmModule.forFeature([
            JeuxRepositoryTypeORM,
            JoueurRepositoryTypeORM,
            LeaderRepositoryTypeORM
        ])
    ]
})
export class SharedModule {}
