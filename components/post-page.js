import PostHeader from './post-header';

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
