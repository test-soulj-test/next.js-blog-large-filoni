import HeroPost from './hero-post';
import Intro from './intro';

export function PostIndex({ data }) {
  const { allPosts } = data;

  const heroPost = allPosts[0];

  return (
    <>
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
    </>
  );
}
