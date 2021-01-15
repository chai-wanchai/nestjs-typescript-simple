import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../model/user.entity';

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
          entities: [UserEntity]
        }
        return option
      }
    }),
  ]
})
export class DatabaseModule { }