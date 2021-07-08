import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from '../produto/produto.module';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';
import { Compra } from './entity/compra.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Compra]),ProdutoModule],
    controllers: [CompraController],
    providers: [CompraService]
})
export class CompraModule {}
