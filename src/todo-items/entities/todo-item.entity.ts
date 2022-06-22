import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseUpdatedEntity } from '../../shared/entities/base-updated.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'todo_items' })
export class TodoItemEntity extends BaseUpdatedEntity {
  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  isComplete: boolean;

  @Column()
  @Expose()
  isFavorite: boolean;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  @Expose()
  author: UserEntity;
}
