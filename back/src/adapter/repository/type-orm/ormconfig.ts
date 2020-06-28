import { join } from 'path'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export const configORM = ({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    migrations: [join(__dirname, '**/migration/*{.ts,.js}')],
    migrationsRun: true,
    cli: { migrationsDir: join(__dirname, '**/migration') },
    synchronize: false,
} as unknown) as MysqlConnectionOptions
