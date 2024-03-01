import Header from './header';
import MoreStories from './more-stories';
import PostBody from './post-body';
import PostHeader from './post-header';
import SectionSeparator from './section-separator';

export function PostPage({ data }) {
  const { post } = data;

  return (
    <>
      <article>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
      </article>
    </>
  );
}
