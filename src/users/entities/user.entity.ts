import { Exclude, Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseUpdatedEntity } from '../../shared/entities/base-updated.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseUpdatedEntity {
  @Column()
  @Expose()
  name: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Expose()
  avatar: string;
}
