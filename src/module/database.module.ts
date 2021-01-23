import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { entities } from 'src/constant/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database')
        const syncDB = !configService.get('isProduction')
        const option: TypeOrmModuleOptions = {
          name: 'default',
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database_name,
          synchronize: syncDB,
          logging: syncDB,
          entities: entities
        }
        return option
      }
    }),
  ]
})
export class DatabaseModule { }