## Shopify & Sanity Integration

This project now integrates **Shopify** with **Sanity CMS** to provide a headless commerce solution with flexible content management.

### Integration

- This Hydrogen Storefront loads 1 featured collection on index with product data being loaded from Shopify storefront API.
- Also on the PDP loads product data from Sanity Studio synchronized with Shopify. To check this you can navigate to a product page or check the product route code.

### Features

- **Product Data from Sanity**: Product information, descriptions, and content are fetched from Sanity CMS
- **Commerce from Shopify**: Orders, inventory, and checkout functionality are powered by Shopify
- **Optimized PDP**: Product Detail Pages (PDP) load product data from Sanity for enhanced content flexibility
- **Unified Architecture**: Combines Shopify's commerce capabilities with Sanity's content management system

### How It Works

The integration follows a hybrid approach:

- **Content Layer**: Sanity CMS manages product content, descriptions, and rich media
- **Commerce Layer**: Shopify Storefront API handles product availability, pricing, and checkout
- **Data Loading**: Product pages fetch data from both sources, with Sanity providing the content context and Shopify providing the commerce functionality

# Hydrogen template: Skeleton

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Vite
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
