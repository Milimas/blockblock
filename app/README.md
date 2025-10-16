# BlockBlock

BlockBlock is a modern web application for exploring blockchain data, built with [Next.js](https://nextjs.org). It provides a modular, extensible interface to browse blocks, transactions, wallets, and more, with real-time updates and a clean UI.

## Features

- **Blocks Explorer:** Browse blocks, view columns, and inspect block details and transactions.
- **Transactions Explorer:** Explore transactions, columns, and individual transaction data.
- **Wallet Viewer:** View wallet addresses and related information.
- **Breadcrumb Navigation:** Track and navigate your browsing history.
- **Real-Time Updates:** Integrated WebSocket support for live blockchain data.
- **Reusable UI Components:** Includes buttons, cards, tables, alerts, tooltips, and more.
- **Mobile Support:** Responsive design with mobile detection hooks.

## Project Structure

```
app/
├── favicon.ico
├── globals.css
├── layout.tsx
├── loading.tsx
├── page.tsx
├── socket.ts
├── @breadcrumbs/
│   ├── default.tsx
│   └── [...catchAll]/page.tsx
├── blocks/
│   ├── columns.tsx
│   ├── page.tsx
│   └── [block_hash]/
│       ├── page.tsx
│       └── transactions/page.tsx
├── transactions/
│   ├── columns.tsx
│   ├── page.tsx
│   └── [transaction_hash]/page.tsx
└── wallet/
   ├── default.tsx
   └── [wallet_address]/page.tsx

components/
├── app-sidebar.tsx
├── breadcrumbs.tsx
├── copy-button.tsx
├── dark-mode-toggle.tsx
├── data-table.tsx
├── headless-data-table.tsx
├── navbar.tsx
├── shortHash.tsx
├── theme-provider.tsx
├── wallet-balance.tsx
├── wallet.tsx
├── block/
│   ├── blocks-card-columns.tsx
│   ├── blocks-card.tsx
│   └── last-block.tsx
├── transaction/
│   ├── transactions-card-columns.tsx
│   └── transactions-card.tsx
└── ui/
   ├── alert.tsx
   ├── badge.tsx
   ├── breadcrumb.tsx
   ├── button.tsx
   ├── card.tsx
   ├── dropdown-menu.tsx
   ├── input.tsx
   ├── navigation-menu.tsx
   ├── separator.tsx
   ├── sheet.tsx
   ├── sidebar.tsx
   ├── skeleton.tsx
   ├── table-skeleton.tsx
   ├── table.tsx
   └── tooltip.tsx

hooks/
└── use-mobile.tsx

lib/
└── utils.ts

utils/
└── api.ts
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Customization

- Edit `app/page.tsx` for the landing page.
- Extend features in `blocks/`, `transactions/`, and `wallet/`.
- Use `socket.ts` for real-time data.
- Add or modify UI components in `components/ui/`.
- Utility functions are in `lib/utils.ts` and `utils/api.ts`.
- Mobile detection is available via `hooks/use-mobile.tsx`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

---

BlockBlock is ideal for developers and blockchain enthusiasts seeking a clean, extensible platform for blockchain data exploration.

