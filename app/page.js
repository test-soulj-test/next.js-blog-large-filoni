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

function getPageRequest() {
  const { isEnabled } = draftMode();

  return { query: PAGE_CONTENT_QUERY, includeDrafts: isEnabled };
}

export default async function Page() {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);
  const { allPosts } = data;

  const heroPost = allPosts[0];
  const { title, coverImage, date, excerpt, author, slug } = heroPost;

  if (isEnabled) {
    return (
      <DraftPostIndex
        subscription={{
          ...pageRequest,
          initialData: data,
          token: process.env.NEXT_DATOCMS_API_TOKEN,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
        }}
      />
    );
  }

  return (
    <>
      <Intro />
      <section>
        <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">Image</h3>

        <div>
          <Link href={'/optimized'} className="hover:underline">
            optimized
          </Link>
        </div>

        <div>
          <Link href={'/not-optimized'} className="hover:underline">
            Not optimized
          </Link>
        </div>

        <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">Video</h3>
        <div>
          <Link href={'/video/optimized'} className="hover:underline">
            optimized
          </Link>
        </div>

        <div>
          <Link href={'/video/not-optimized'} className="hover:underline">
            Not optimized
          </Link>
        </div>
      </section>
    </>
  );
}
