
# Maitre - Məhsullar

Products page of the Maitre admin panel. Built with React, TypeScript, Vite and Tailwind CSS v4.

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Other commands:

```bash
npm run build
npm test
npm run lint
```

`src/api.ts` is the given mock server and I did not change it. It fails 10% of the time on purpose, so sometimes you will see the error state. Just click "Yenidən cəhd et".

## What is done

- Product list with search, category filter and pagination
- Create and edit product (modal form with error messages)
- Toggle in the list to put a product on or off sale
- Loading, empty and error states
- Responsive mobile layout
- Search, category and page are kept in the URL
- Tailwind CSS v4 styling

## Project structure

```text
src/
  api.ts              given mock server
  components/         reusable UI components
  hooks/              loading data and URL filters
  lib/                price format and form validation (with tests)
  index.css           global styles, CSS variables and animations
  main.tsx            application entry point
```

## Main decisions

- **Styling with Tailwind CSS v4.** Components use Tailwind utility classes instead of separate component CSS files. Global CSS variables are kept in `index.css` for colors, fonts and sizes from the style guide.
- **Small components.** `ProductsPage` keeps the state, while the other components focus on displaying UI and handling their own interactions.
- **URL as the source of truth** for search, category and page, so refresh and the back button work. Search waits 300ms after typing so it does not call the API on every letter.
- **Toggle updates right away.** If the request fails, it goes back to the old value and shows an error message.
- **Form uses the native `<dialog>`.** Escape and the dark background work without an extra library. If the server returns an error, it is shown at the top and the form stays open.
- **Reusable components.** Buttons, inputs, selects, switches, tables and messages are separate components.

## Decisions for open points

- **Price format:** `4,50 ₼`. In the form `4,5` and `4.5` both work.
- **Page size:** 10, like the design.
- **Sorting and paging:** the API cannot sort, so I load all matching products in one request and make the pages in the code. This is fine for 48 products. With a real backend I would use server-side paging.
- **New product:** the API adds it to the end, but I show it at the top of the first page. For this I clear the search and category filter after saving. Products added in this session stay on top, newest first.
- **Filters:** changing search or category goes back to page 1.
- **Subtitle:** with a filter it says "Filtrə uyğun · N məhsul", because the number is not all products anymore.
- **Two empty states:** no products at all, and no result for the filter (with a "clear filters" button).
- **Errors:** if the list fails to load, the table is replaced by a message with a retry button.
- **Mobile (under 720px):** rows become cards and the modal opens from the bottom.
- **Header name:** static text, because there is no login.

## Testing

Vitest is used for unit tests, including price formatting and form validation.

## Time spent

3 hours

## What I would do with more time

- More tests (components, toggle error, URL)
- A better tablet layout (now it is the desktop table with smaller margins)
- Sorting and an "on sale / off sale" filter
- A nicer mobile loading skeleton
