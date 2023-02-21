import { Entity, PrimaryGeneratedColumn, Column,} from 'typeorm';
@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

  @Column()
  revId: number;
  @Column()
  userId: number;
  @Column({ type: 'varchar', length: 250 })
  userName: string;
  @Column({ type: 'varchar', length: 250 })
  revName: string;
  @Column({ type: 'varchar', length: 250 })
  title: string;
  @Column({ type: 'varchar', length: 450 })
  body: string;
  
  @Column({ type: 'varchar', length: 500 })
creatTime: string;

  
}