import {
    Module
} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {join} from 'path'
// import {SharedModule} from '../old/old/infra/shared/shared.module'
// import {HeroModule} from '../old/old/infra/hero/hero.module'
import {APP_INTERCEPTOR} from "@nestjs/core";
import {Interceptor} from "./adapter/application/nest-js/interceptor/Interceptor";
import {JeuxModule} from "./adapter/application/nest-js/jeux/jeux.module";
import {LeadersModule} from "./adapter/application/nest-js/leaders/leaders.module";
console.log(join(__dirname, '**', '*.entity.{ts,js}'))
@Module({
    imports: [
        TypeOrmModule.forRoot(),
        JeuxModule,
        LeadersModule
    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: Interceptor,
        },
    ],
})
export class AppModule {
}
