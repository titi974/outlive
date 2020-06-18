import { Module } from '@nestjs/common';
import {LeadersService} from "./leaders.service";
import {LeadersController} from "./leaders.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LeaderRepositoryTypeORM} from "../../../repository/type-orm/LeaderRepositoryTypeORM";

@Module({
    imports: [
        TypeOrmModule.forFeature([LeaderRepositoryTypeORM]),
    ],
    providers:[LeadersService],
    controllers: [LeadersController]
})
export class LeadersModule {}
