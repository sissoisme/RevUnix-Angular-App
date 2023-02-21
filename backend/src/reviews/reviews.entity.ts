import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    topic: string;

    @Column({ type: 'varchar', length: 50 })
    author: string;

    @Column()
    authorId: number;

    @Column({ type: 'varchar', length: 50 })
    status: string;

  

    @Column({ type: 'varchar', length: 50 })
    publishedTime: string;
    //Engine

    @Column({ type: 'varchar', length: 30 })
    category: string;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 300 })
    subTitle: string;

    @Column({ type: 'varchar', length: 1000 })
    body: string;

    @Column({ type: 'varchar', length: 50 })
    rate: string;

    @Column({ type: 'varchar', length: 50 })
    length: string;

    @Column()
    releaseYear: number;
    
    @Column({ type: 'varchar', length: 200 })
    tags: string;
    
    @Column({ type: 'varchar', length: 250 })
    imgUrl: string;

    @Column({ type: 'text' })
    imgFile: string;

    //BYTOPIC
    @Column({ type: 'varchar', length: 50 })
    bookPublisher: string;

    @Column({ type: 'varchar', length: 50 })
    bookPages: string;

    @Column({ type: 'varchar', length: 50 })
    bookAuthor: string;

    @Column({ type: 'varchar', length: 50 })
    tvEpisode: string;

    @Column({ type: 'varchar', length: 50 })
    tvSeries: string;

    @Column({ type: 'boolean'})
    displayStatus: boolean;
}