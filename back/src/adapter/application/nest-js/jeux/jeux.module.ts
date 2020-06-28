import { Module } from '@nestjs/common'
import { JeuxController } from './jeux.controller'
import { JeuxService } from './jeux.service'
import { UUIDGenerator } from '../../../id-generator/UUIDGenerator'
import { SharedModule } from '../shared/shared.module'

@Module({
    imports: [SharedModule],
    providers: [JeuxService, UUIDGenerator],
    controllers: [JeuxController],
})
export class JeuxModule {}
