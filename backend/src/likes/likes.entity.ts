import { Entity, PrimaryGeneratedColumn, Column,} from 'typeorm';

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

  @Column()
  revId: number;
  @Column()
  userId: number;
  
  @Column({ type: 'varchar', length: 250 })
creatTime: string;
}