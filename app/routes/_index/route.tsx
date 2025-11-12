import {useLoaderData} from 'react-router';
import type {Route} from './+types/route';
import FeaturedCollection from './components/featured-collection/';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collection}] = await Promise.all([
    context.storefront.query(COLLECTION_QUERY),
  ]);

  return {
    featuredCollection: collection,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="w-full flex justify-center">
      <FeaturedCollection collection={data.featuredCollection} />
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query Collection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "shopify") {
      id
      title
      image {
        id
        url
        altText
        width
        height
      }
      handle
      products(first: 4) {
        nodes {
          id
          title
          handle
          images(first: 1) {
            nodes {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
` as const;
