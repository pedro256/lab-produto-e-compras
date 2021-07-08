import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { Produto } from './entity/produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {


    constructor(private service:ProdutoService){}

    @Get(':id')
    async getOneById(@Param() params){
        return await this.service.getProduto(params.id);
    }

    @Get()
    async getAll(){
        return await this.service.getProdutos();
    }
    
    @Post()
    async create(@Body() produto:Produto){
        return await this.service.saveProduto(produto);
    }

    @Put(':id')
    async update(@Body() produto:Produto,@Param() params){
        const oldProduto = await this.service.getProduto(params.id);
        return await this.service.updateProduto(oldProduto,produto)
    }
    @Patch(':id')
    async updateOne(@Body() produto:Produto,@Param() params){
        const oldProduto = await this.service.getProduto(params.id);
        return await this.service.updateProduto(oldProduto,produto);
    }
    @Delete(':id')
    @HttpCode(204)
    async deleteOne(@Param() params){
        return await this.service.deleteProduto(params.id)
    }

}
