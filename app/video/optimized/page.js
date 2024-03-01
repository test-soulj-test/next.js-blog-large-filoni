import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';

import { DraftPostIndex } from '@/components/draft-post-index';
import Intro from '@/components/intro';
import DateComponent from '@/components/date';
import CoverImage from '@/components/cover-image';
import Link from 'next/link';
import Avatar from '@/components/avatar';

export async function generateStaticParams() {
  const { allPosts } = await performRequest({ query: '{ allPosts { slug } }' });

  return allPosts.map(({ slug }) => slug);
}

const PAGE_CONTENT_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    blog {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    allPosts(orderBy: date_DESC, first: 20) {
      title
      slug
      excerpt
      date
      coverImage {
        url
        video {
          mp4Url
        }
        responsiveImage(imgixParams: {auto: format}) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
            ...responsiveImageFragment
          }
        }
      }
    }
  }

  ${metaTagsFragment}
  ${responsiveImageFragment}
`;

function getPageRequest(slug) {
  const { isEnabled } = draftMode();

  return {
    query: PAGE_CONTENT_QUERY,
    includeDrafts: isEnabled,
    variables: { slug },
  };
}
export default async function Page() {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);
  const { allPosts } = data;

  const heroPost = allPosts[1];
  const { title, coverImage, date, excerpt, author, slug } = heroPost;

  return (
    <>
      <Intro />
      <section>
        <div className="mb-8 md:mb-16">
          <CoverImage title={title} responsiveImage={coverImage} slug={slug} />
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
          <div>
            <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            <div className="mb-4 md:mb-0 text-lg">
              <DateComponent dateString={date} />
            </div>
          </div>
          <div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
      </section>
    </>
  );
}
