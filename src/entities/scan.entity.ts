import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'scans' })
export class ScanEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ownerId: string;

    @Column()
    path: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: number;

    @ManyToOne(type => UserEntity, user => user.scans)
    owner: UserEntity;
}