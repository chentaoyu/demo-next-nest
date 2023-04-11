import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { useFeature } from 'src/client/hooks/useFeature';

type THomeProps = {
  blogPosts: BlogPost[];
};
const Home: FC<THomeProps> = ({ blogPosts }) => {
  const linkFeature = useFeature('blog_link');

  return (
    <div>
      <h1>Home</h1>
      {blogPosts.map(({ title, id }) => (
        <div key={id}>
          {linkFeature ? (
            <>
              {title}
              <Link href={`/${id}`}> Link</Link>
            </>
          ) : (
            <Link href={`/${id}`}>{title}</Link>
          )}
        </div>
      ))}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<THomeProps> = async () => {
//   const blogPosts = await fetch('/api/blog-posts');
//   return { props: { blogPosts } };
// };
export const getServerSideProps = buildServerSideProps<THomeProps>(async () => {
  const blogPosts = await fetch('/api/blog-posts');

  return { blogPosts };
});

export default Home;
