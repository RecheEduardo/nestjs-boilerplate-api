import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ServerConfig } from './common/config/server.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './common/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ServerConfig, TypeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfig.KEY],
      useFactory: (config: ConfigType<typeof TypeOrmConfig>) => config,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
