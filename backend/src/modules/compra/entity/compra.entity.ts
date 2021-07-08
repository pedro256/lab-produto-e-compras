import { Produto } from "src/modules/produto/entity/produto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Compra {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    total:number;

    @Column()
    data_criacao: Date;

    @Column()
    tipo_pagamento: string;

    @Column()
    status: string;

    @ManyToOne(()=>Produto,(produto:Produto) => produto.compras,{onDelete:'CASCADE'})
    produto: Produto;

}
