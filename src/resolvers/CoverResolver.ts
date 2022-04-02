import DataLoader from 'dataloader';
import {fields} from 'ts-igdb-client';
import {RawRoutes} from 'ts-igdb-client/dist/types';
import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {Loader} from 'type-graphql-dataloader';
import {MyContext, RLoader} from '../@types/types';
import {Cover, Game} from '../entity';
import {CheckToken} from '../utils/tokenMiddleware';
import {loaderResolver} from '../utils/utils';

@Resolver(() => Cover)
export class CoverResolver {
  @FieldResolver()
  @Loader<RLoader, RawRoutes[]>(
    async (game, {context}) => await loaderResolver(game, 'games', context),
  )
  async game(@Root() {id, game}: Cover) {
    return (dataloader: DataLoader<RLoader, Game[]>) =>
      dataloader.load({id, ids: game});
  }

  @Query(() => [Cover], {nullable: true})
  @UseMiddleware(CheckToken)
  // @CacheControl({ maxAge: 1 })
  async covers(@Ctx() {client}: MyContext) {
    const {data} = await client
      .request('covers')
      .pipe(fields(['*']))
      .execute();

    return data;
  }
}
