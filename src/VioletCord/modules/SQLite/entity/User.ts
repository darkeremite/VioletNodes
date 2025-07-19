import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({name:"Users"})
export class User {
    @PrimaryColumn({type:"text"})
    discord_id: string

    @Column({type:"integer"})
    balance: number = 0

    @Column({
        nullable: true,
        type: "text"
    })
    invite_link?: string = undefined
}