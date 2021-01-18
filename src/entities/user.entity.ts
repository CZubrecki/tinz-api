import { BaseEntity, Column, Entity } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ unique: true })
    id: number;

    @Column({ unique: true })
    email: string;
}