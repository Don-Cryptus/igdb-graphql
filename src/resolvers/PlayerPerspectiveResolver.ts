import {fields} from 'ts-igdb-client';
import {Ctx, Query, Resolver, UseMiddleware} from 'type-graphql';
import {MyContext} from '../@types/types';
import {PlayerPerspective} from '../entity';
import {CheckToken} from '../utils/tokenMiddleware';

@Resolver(() => PlayerPerspective)
export class PlayerPerspectiveResolver {
  @Query(() => [PlayerPerspective], {nullable: true})
  @UseMiddleware(CheckToken)
  // @CacheControl({ maxAge: 1 })
  async playerPerspectives(@Ctx() {client}: MyContext) {
    const {data} = await client
      .request('player_perspectives')
      .pipe(fields(['*']))
      .execute();

    return data;
  }
}
