import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
