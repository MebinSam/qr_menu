# 🍽️ Serverless QR Code Restaurant Menu App

A ultra-fast, mobile-first, zero-backend QR code digital restaurant menu web application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **TanStack Query**.

Powered directly by **Google Sheets** via **SheetDB API**. Restaurant staff can update prices, stock availability, menu descriptions, categories, and images in Google Sheets without touching a single line of code!

---

## ✨ Features

- 📱 **Mobile-First Responsive Layout**: Designed specifically for smartphone screens (375px–430px) with desktop scaling support.
- ⚡ **Real-Time Google Sheets Sync**: Fetches live data from Google Sheets via SheetDB API.
- 🔄 **Automatic Offline / Demo Fallback**: Loads rich built-in mock data if the API URL is empty or unreachable.
- 🏷️ **Dynamic Category Tabs**: Smooth horizontal scrolling tab bar with Framer Motion active indicators.
- 🔍 **Live Search & Dietary Filter Pills**: Instant searching by name, ingredient, or tags (e.g. *Vegan*, *Gluten-Free*, *Spicy*, *Chef Special*).
- 🚫 **Out-of-Stock Handling**: Items marked `is_available = FALSE` in Google Sheets are automatically greyed out with an "Out of Stock" badge.
- 📖 **Interactive Item Detail Sheet**: Framer Motion animated modal displaying high-res photos, allergen warnings, full story, and sharing options.
- 📲 **Built-in QR Code Generator & Scanner Simulator**: Table selection dropdown (e.g. Table #12) with printable QR code modal.

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
# Navigate to project directory
cd qr_menu

# Install npm packages
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

If you leave `VITE_SHEETDB_API_URL` empty, the app will run with the included demo menu data.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📊 Setting Up Google Sheets + SheetDB Backend

Follow these 4 simple steps to connect your own Google Sheet:

### Step 1: Create the Google Sheet
Create a new Google Sheet with **two tabs** named `Menu` and `Categories`.

#### Tab 1: `Menu`
Ensure the header row (Row 1) contains these exact lowercase column names:

| `id` | `category` | `title` | `description` | `price` | `image_url` | `is_available` | `tags` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `item_101` | `Starters` | `Truffle Fries` | `Tossed in black truffle oil & parmesan` | `13.50` | `https://images.unsplash.com/...` | `TRUE` | `Gluten-Free,Chef Special` |
| `item_102` | `Mains & Grills` | `Wagyu Steak` | `8oz American Wagyu with bone marrow butter` | `48.00` | `https://images.unsplash.com/...` | `TRUE` | `Chef Special` |
| `item_103` | `Desserts` | `Molten Cake` | `Warm dark chocolate center with gelato` | `14.00` | `https://images.unsplash.com/...` | `FALSE` | `Chef Special` |

> 💡 **Tip:** Set `is_available` to `TRUE` or `FALSE`. `tags` can be comma-separated like `Vegan,Spicy,Gluten-Free`.

#### Tab 2: `Categories`
Ensure the header row (Row 1) contains these exact lowercase column names:

| `id` | `name` | `display_order` |
| :--- | :--- | :--- |
| `cat_01` | `Starters` | `1` |
| `cat_02` | `Mains & Grills` | `2` |
| `cat_03` | `Desserts` | `3` |
| `cat_04` | `Craft Beverages` | `4` |

---

### Step 2: Create a SheetDB Endpoint
1. Go to [SheetDB.io](https://sheetdb.io/) and log in or create a free account.
2. Click **Create New API**.
3. Paste the share link of your Google Sheet (ensure spreadsheet link sharing is set to *"Anyone with the link can view"*).
4. SheetDB will generate an API endpoint URL like:
   `https://sheetdb.io/api/v1/58f61be4dda40`

---

### Step 3: Link Endpoint in `.env.local`
Open your `.env.local` file and paste your SheetDB API URL:
```env
VITE_SHEETDB_API_URL=https://sheetdb.io/api/v1/YOUR_SHEETDB_ID
```

---

### Step 4: Restart Dev Server
Restart `npm run dev` to see your Google Sheet menu live on screen!

---

## 🛠 Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **State & Caching:** `@tanstack/react-query` v5
- **Animations:** `framer-motion`
- **Icons:** `lucide-react`
- **API Provider:** Google Sheets API via `SheetDB`

---

## 🌐 Deploying to Production (Vercel / Netlify)

1. Push your code to GitHub.
2. Import repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. In Environment Variables, set `VITE_SHEETDB_API_URL` to your SheetDB URL.
4. Deploy! Your QR Code menu will be live instantly.
