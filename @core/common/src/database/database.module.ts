import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.getOrThrow('database.mysql.host'),
        port: config.getOrThrow('database.mysql.port'),
        database: config.getOrThrow('database.mysql.database'),
        username: config.getOrThrow('database.mysql.username'),
        password: config.getOrThrow('database.mysql.password'),
        synchronize: config.getOrThrow('database.mysql.sync'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}
