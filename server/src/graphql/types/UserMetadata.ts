import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class UserMetadata {
  @Field() creationTime: string;

  @Field({ nullable: true })
  lastSignInTime?: string;
}
