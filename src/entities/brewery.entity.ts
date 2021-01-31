import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BeerEntity } from "./beer.entity";

@Entity({ name: 'breweries' })
export class BreweryEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    country: string;

    @OneToMany(type => BeerEntity, beer => beer.brewery)
    beers: BeerEntity[];
}