import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoService } from '../produto/produto.service';
import { CompraDTO } from './dto/CompraDTO';
import { Compra } from './entity/compra.entity';

@Injectable()
export class CompraService {
    constructor(
        @InjectRepository(Compra) private compraRepository:Repository<Compra>,
        private readonly produtoService:ProdutoService

        ){}
    
        async getCompras(): Promise<Compra[]>{
            return await this.compraRepository.find();
        }
        async getCompra(id: number): Promise<Compra>{
            return await this.compraRepository.findOne({
                where:[{"id":id}],
                relations:['produto']
            });
        }
        async saveCompra(compra:CompraDTO){
            const produto = await this.produtoService.getProduto(compra.produtoId)
            compra.data_criacao = new Date(Date.now())
            compra.produto = produto
            return await this.compraRepository.save(compra)

        }
        async deleteCompra(id:number){
            return await this.compraRepository.delete(id);
        }
        async updateCompra(compraOld:Compra,compraNew:CompraDTO){
            Object.keys(compraNew).forEach((key)=>{
                compraOld[key] = compraNew[key]
            })

            try {
                return await this.compraRepository.save(compraOld)
            } catch (error) {
                return error
            }
        }
}
