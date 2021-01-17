import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    _id: string

    @Column()
    email: string;
}