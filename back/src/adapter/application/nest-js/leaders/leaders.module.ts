import { Module } from '@nestjs/common';
import {LeadersService} from "./leaders.service";
import {LeadersController} from "./leaders.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LeaderRepositoryTypeORM} from "../../../repository/type-orm/LeaderRepositoryTypeORM";
import {JeuxRepositoryTypeORM} from "../../../repository/type-orm/JeuxRepositoryTypeORM";

@Module({
    imports: [
        TypeOrmModule.forFeature([LeaderRepositoryTypeORM, JeuxRepositoryTypeORM]),
    ],
    providers:[LeadersService],
    controllers: [LeadersController]
})
export class LeadersModule {}
