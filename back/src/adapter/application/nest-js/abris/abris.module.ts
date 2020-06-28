import { Module } from '@nestjs/common'
import { AbrisService } from './abris.service'
import { AbrisController } from './abris.controller'
import { SharedModule } from '../shared/shared.module'
import { UUIDGenerator } from '../../../id-generator/UUIDGenerator'

@Module({
    imports: [SharedModule],
    providers: [AbrisService, UUIDGenerator],
    controllers: [AbrisController],
})
export class AbrisModule {}
