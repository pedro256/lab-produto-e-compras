import { Produto } from "src/modules/produto/entity/produto.entity";

export class CompraDTO{
    produtoId:number;
    total:number;
    tipo_pagamento: string;
    status: string;
    data_criacao:Date;
    produto: Produto;
}