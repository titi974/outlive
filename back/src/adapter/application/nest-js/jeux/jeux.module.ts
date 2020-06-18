import {Module} from '@nestjs/common'
import {JeuxController} from "./jeux.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JeuxRepositoryTypeORM} from "../../../repository/type-orm/JeuxRepositoryTypeORM";
import {JeuxService} from "./jeux.service";
import {UUIDGenerator} from "../../../id-generator/UUIDGenerator";
import JeuxMapperPersistance from "../../../repository/type-orm/mapper/JeuxMapperPersistance";
import {JoueurRepositoryTypeORM} from "../../../repository/type-orm/JoueurRepositoryTypeORM";

@Module({
    imports: [
        TypeOrmModule.forFeature([JeuxRepositoryTypeORM, JoueurRepositoryTypeORM]),
    ],
    providers: [JeuxService, UUIDGenerator, JeuxMapperPersistance],
    controllers: [JeuxController],
})
export class JeuxModule {
}