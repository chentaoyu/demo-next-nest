import { ParsedUrlQuery } from 'querystring';
import { Config } from 'src/shared/types/config';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'src/shared/types/next';
import { AppData } from 'src/shared/types/app-data';
import { filterUnserializable } from './filterUnserializable';

type StaticProps = {
  appData: Partial<AppData>;
};

type StaticQuery = {
  config: Config;
};

const buildServerSideProps = <P, Q extends ParsedUrlQuery = ParsedUrlQuery>(
  getServerSideProps: (ctx: GetServerSidePropsContext<Q>) => Promise<P>,
): GetServerSideProps<Partial<StaticProps> & P, Partial<StaticQuery> & Q> => {
  return async (ctx) => {
    const { features } = ctx.query.config || {};

    return {
      props: {
        ...(await getServerSideProps(ctx)),
        appData: filterUnserializable({ features }) as StaticProps['appData'],
      },
    };
  };
};

export { buildServerSideProps };
