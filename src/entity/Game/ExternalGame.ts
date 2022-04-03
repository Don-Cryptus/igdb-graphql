import {Field, Int, ObjectType} from 'type-graphql';
import {
  ExternalGameCategoryEnum,
  ExternalGameMediaEnum,
} from '../../@types/enum';
import {Platform} from '../Platform/Platform';
import {Game} from './Game';

@ObjectType()
export class ExternalGame {
  @Field(() => Int, {nullable: true})
  id?: number;

  @Field(() => ExternalGameCategoryEnum, {nullable: true})
  category?: ExternalGameCategoryEnum;

  @Field(() => Int, {nullable: true})
  created_at?: number;

  @Field(() => Game, {nullable: true})
  game?: Game | number;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  uid?: string;

  @Field(() => Int, {nullable: true})
  updated_at?: number;

  @Field({nullable: true})
  url?: string;

  @Field(() => Int, {nullable: true})
  year?: number;

  @Field(() => ExternalGameMediaEnum, {nullable: true})
  media?: ExternalGameMediaEnum;

  @Field(() => Platform, {nullable: true})
  platform?: Platform | number;

  @Field(() => [Int], {nullable: true})
  countries?: number[];

  @Field({nullable: true})
  checksum?: string;
}
