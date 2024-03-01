import { Image as DatocmsImage } from 'react-datocms';
import cn from 'classnames';
import Link from 'next/link';

export default function CoverImage({
  title,
  responsiveImage,
  notResponsiveImage,
  slug,
}) {
  let image;
  if (notResponsiveImage?.video) {
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
        <source src={notResponsiveImage.url} type="video/mp4" />
      </video>
    );
  } else if (notResponsiveImage) {
    image = (
      <img
        src={notResponsiveImage.url}
        alt={`Cover for ${title}`}
        className={cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        })}
      />
    );
  }

  if (responsiveImage?.video) {
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
        <source src={responsiveImage.video.mp4Url} type="video/mp4" />
      </video>
    );
  } else if (responsiveImage) {
    image = (
      <DatocmsImage
        data={{
          ...responsiveImage,
          alt: `Cover Image for ${title}`,
        }}
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
