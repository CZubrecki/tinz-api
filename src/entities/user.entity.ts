import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryColumn({ unique: true })
    id: number;

    @Column({ unique: true })
    email: string;
}