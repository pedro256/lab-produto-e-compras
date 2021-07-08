import { Injectable,Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm'
import { ProdutoDTO } from './dto/ProdutoDTO';
import { Produto } from './entity/produto.entity';

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto) private produtoRepository:Repository<Produto>
        ){}
    
    async getProdutos(): Promise<Produto[]>{
        return await this.produtoRepository.find();
    }
    async getProduto(id: number): Promise<Produto>{
        return await this.produtoRepository.findOne({
            where:[{"id":id}],
            relations:['compras']
        });
    }
    async saveProduto(produto:Produto){
        produto.data_criacao = new Date(Date.now())
        produto.data_atualizao = new Date(Date.now())
        return await this.produtoRepository.save(produto)
    }
    async deleteProduto(id:number){
        return await this.produtoRepository.delete(id);
    }
    async updateProduto(produtoOld:Produto,produtoNew:ProdutoDTO){
        Object.keys(produtoNew).forEach((key)=>{
            produtoOld[key] = produtoNew[key]
        })
        produtoOld.data_atualizao = new Date(Date.now())
        try {
            return await this.produtoRepository.save(produtoOld)
        } catch (error) {
            return error
        }
    }

}
