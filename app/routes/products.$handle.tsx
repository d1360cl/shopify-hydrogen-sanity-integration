import {useLoaderData, type LoaderFunctionArgs} from 'react-router';
import type {Route} from './+types/products.$handle';
import {Analytics} from '@shopify/hydrogen';

import {PortableText, type PortableTextBlock} from '@portabletext/react';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader({
  params,
  context: {storefront, sanity},
}: LoaderFunctionArgs) {
  const {product} = await storefront.query<{product: Product}>(
    `#graphql
      query Product($handle: String!) {
        product(handle: $handle) { id title description }
      }
    `,
    {variables: params},
  );

  const PRODUCT_QUERY = `*[_type == "product" && store.slug.current == $handle][0]{
    body,
    "image": store.previewImageUrl
  }`;

  // Fetch product data from Sanity

  const initial = await sanity.fetch<{
    body: PortableTextBlock[] | null;
    image: string | null;
  } | null>(PRODUCT_QUERY, params, {
    tag: 'homepage',
    hydrogen: {debug: {displayName: 'query Homepage'}},
  });

  if (!initial) {
    throw new Response('Product not found', {status: 404});
  }

  return {product, initial};
}

export default function Product() {
  const {product, initial} = useLoaderData<typeof loader>();
  const {title, description} = product;
  return (
    <div className="w-full mb-24">
      <div className="product-main flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-10">{title}</h1>
        {initial?.image ? (
          <img
            alt={product.title}
            src={initial.image}
            className="size-32 mb-6 mr-6 object-cover float-left rounded-xl"
          />
        ) : null}
        {Array.isArray(initial?.body) ? (
          <PortableText value={initial.body} />
        ) : null}
      </div>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: '0',
              vendor: product.vendor,
              variantId: '',
              variantTitle: '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}
