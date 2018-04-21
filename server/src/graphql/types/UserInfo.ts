import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class UserInfo {
  @Field(type => ID)
  uid: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  photoURL?: string;

  @Field()
  providerId: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
