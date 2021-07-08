import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraDTO } from './dto/CompraDTO';

@Controller('compra')
export class CompraController {

    constructor(private service: CompraService){}

    @Get()
    async getAll(){
        return await this.service.getCompras()
    }
    @Get(':id')
    async getOne(@Param() params){
        return await this.service.getCompra(params.id)
    }
    @Post()
    async create(@Body() compra:CompraDTO){
        return await this.service.saveCompra(compra);
    }
    @Put(':id')
    async updateAll(@Body() compra:CompraDTO, @Param() params){
        const compraOld = await this.service.getCompra(params.id)
        return await this.service.updateCompra(compraOld,compra)
    }
    @Patch(':id')
    async update(@Body() compra:CompraDTO, @Param() params){
        const compraOld = await this.service.getCompra(params.id)
        return await this.service.updateCompra(compraOld,compra)
    }
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param() params){
        
        const response =  await this.service.deleteCompra(params.id)
        if(response){
            return response
        }
    }
}
