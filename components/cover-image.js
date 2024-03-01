import cn from 'classnames';
import Link from 'next/link';

export default function CoverImage({ title, responsiveImage, slug }) {
  let image;
  if (responsiveImage.video) {
    image = (
      // biome-ignore lint/a11y/useMediaCaption: <explanation>
      <video
        controls
        autoPlay
        alt={`Cover Image for ${title}`}
        className={cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        })}
      >
        <source src={responsiveImage.url} type="video/mp4" />
      </video>
    );
  } else {
    image = (
      <img
        src={responsiveImage.url}
        alt={`Cover Image for ${title}`}
        className={cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        })}
      />
    );
  }
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
