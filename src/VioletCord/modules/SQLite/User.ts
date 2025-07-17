import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryColumn()
    discord_id: number

    @Column()
    balance: number

    @Column()
    invite_link: string
}