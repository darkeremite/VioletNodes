import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Tarif {
    @PrimaryGeneratedColumn()
    tarif_id: number

    @Column()
    name: string

    @Column()
    core: number
    
    @Column()
    ram_gb: number

    @Column()
    disk_gb: number
    
    @Column()
    price: number
}