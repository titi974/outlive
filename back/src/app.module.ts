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
import {Interceptor} from "./adapter/application/nestJs/interceptor/Interceptor";
import {JeuxModule} from "./adapter/application/nestJs/jeux/jeux.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3308,
            username: 'root',
            password: 'test',
            database: 'jeux',
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            synchronize: true,
        }),
        JeuxModule
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
