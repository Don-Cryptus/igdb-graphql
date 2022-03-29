import DataLoader from 'dataloader';
import {fields, igdb} from 'ts-igdb-client';
import {RawRoutes} from 'ts-igdb-client/dist/types';
import {
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {Loader} from 'type-graphql-dataloader';
import {Platform, PlatformFamily, PlatformLogo} from '../../entity';
import {CheckToken} from '../../utils/tokenMiddleware';
import {loaderResolver, RLoader} from '../../utils/utils';

@Resolver(() => Platform)
export class PlatformResolver {
  @FieldResolver()
  @Loader<RLoader, RawRoutes[]>(
    async platform_logo =>
      await loaderResolver(platform_logo, 'platform_logos'),
  )
  async platform_logo(@Root() {id, platform_logo}: Platform) {
    return (dataloader: DataLoader<RLoader, PlatformLogo[]>) =>
      dataloader.load({id, ids: platform_logo});
  }

  @FieldResolver()
  @Loader<RLoader, RawRoutes[]>(
    async platform_family =>
      await loaderResolver(platform_family, 'platform_families'),
  )
  async platform_family(@Root() {id, platform_family}: Platform) {
    return (dataloader: DataLoader<RLoader, PlatformFamily[]>) =>
      dataloader.load({id, ids: platform_family});
  }

  @Query(() => [Platform], {nullable: true})
  @UseMiddleware(CheckToken)
  // @CacheControl({ maxAge: 1 })
  async platforms() {
    const client = igdb(process.env.CLIENT_ID!, process.env.ACCESS_TOKEN!);
    const {data} = await client
      .request('platforms')
      .pipe(fields(['*']))
      .execute();

    return data;
  }
}
