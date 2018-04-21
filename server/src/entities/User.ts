import { IsAlphanumeric, IsIn, Length } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import Base from './Base';

@ObjectType()
@Entity()
export default class User extends Base {
  @Field()
  @Column({ default: 'local' })
  @IsIn([
    'amazon',
    'facebook',
    'local',
    'github',
    'google',
    'instagram',
    'linkedin'
  ])
  readonly provider: string;

  @Field()
  @Column()
  @Length(3, 60)
  @IsAlphanumeric()
  name: string;
}
