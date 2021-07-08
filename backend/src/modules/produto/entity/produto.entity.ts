import { Compra } from 'src/modules/compra/entity/compra.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Produto{

    @PrimaryGeneratedColumn()
    id: number;
     
    @Column()
    name: string;

    @Column()
    descricao: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    preco: number;

    @Column()
    data_criacao: Date;

    @Column()
    data_atualizao: Date;

    @OneToMany(()=> Compra,(compra:Compra)=> compra.produto,{ cascade: true, onDelete: "CASCADE" })
    compras: Compra[]
}
