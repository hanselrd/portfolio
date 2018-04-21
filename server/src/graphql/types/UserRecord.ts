import { Field, ID, ObjectType } from 'type-graphql';
import { UserInfo, UserMetadata } from './';

@ObjectType()
export default class UserRecord {
  @Field(type => ID)
  uid: string;

  @Field({ nullable: true })
  email?: string;

  @Field() emailVerified: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  photoURL?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field() disabled: boolean;

  @Field() metadata: UserMetadata;

  @Field(type => [UserInfo])
  providerData: UserInfo[];

  @Field({ nullable: true })
  customClaims?: string;

  @Field({ nullable: true })
  tokensValidAfterTime?: string;
}
