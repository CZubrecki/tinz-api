import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BreweryEntity } from "./brewery.entity";

@Entity({ name: 'beers' })
export class BeerEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    breweryId: string;

    @Column()
    name: string;

    @Column()
    style: string;

    @Column({ type: 'text', nullable: true })
    substyle: string;

    @Column()
    abv: number;

    @Column()
    ibu: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    imagePath: string;

    @Column({ default: 0 })
    rating: number;

    @ManyToOne(type => BreweryEntity, brewery => brewery.beers)
    brewery: BreweryEntity;
}