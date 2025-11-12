import type {FeaturedCollectionFragment} from '@/storefrontapi.generated';
import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';

function FeaturedCollection({collection}: {collection: Collection}) {
  if (!collection) return null;
  return (
    <div className="w-[75%]">
      <Link to={`/collections/${collection.handle}`} key={collection.id}>
        <h1 className="text-4xl font-semibold">{collection.title}</h1>
      </Link>
      <div className="grid max-sm:grid-cols-1 grid-cols-2">
        {collection.products.nodes.map((product) => (
          <div key={product.id} className="p-4 flex items-center gap-4">
            <Image
              className="max-w-[13vw]"
              src={product.images.nodes[0]?.url}
              alt={product.images.nodes[0]?.altText as string}
            />
            <Link to={`/products/${product.handle}`} key={product.id}>
              <h2 className="text-2xl">{product.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCollection;
