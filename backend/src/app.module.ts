import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './modules/produto/produto.module';
import { CompraModule } from './modules/compra/compra.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "compraseprodutos",
      entities: [path.join(__dirname, "**/**/*.entity{.ts,.js}")],
      synchronize: true
    }),
    ProdutoModule,
    CompraModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
