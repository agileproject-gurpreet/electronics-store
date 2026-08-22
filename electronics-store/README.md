# CircuitStore — Electronics E-Commerce App

A cross-platform electronics e-commerce application built with **React 19 + Vite**.  
The same codebase runs on **Web**, **Mobile**, and **Desktop** without modification.

---

## Application Overview

| Feature | Details |
|---|---|
| Framework | React 19 + Vite 8 |
| Products | 32 electronics products across 10 categories |
| Screens | Login → Dashboard (search + filter) → Product Detail |
| Key capabilities | Category & brand filters, price range, star-rating filter, sort, grid/list view, cart drawer, wishlist, pagination |
| Responsive | Adapts from 320 px (mobile) to 1440 px+ (widescreen) |

---

## Prerequisites

Install **Node.js 18 or later** before running the app.

Download: https://nodejs.org

Verify installation:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

---

## Getting Started (all platforms)

Clone or download the project, then install dependencies once:

```bash
cd electronics-store
npm install
```

---

## Platform 1 — Web Browser

The app runs in any modern desktop browser: **Chrome, Firefox, Edge, Safari**.

### Development mode (recommended for demos — live hot-reload)

```bash
npm run dev
```

Open the URL printed in the terminal:

```
➜  Local:   http://localhost:5173/
```

### Production build + preview

```bash
npm run build
npm run preview
```

Preview opens at `http://localhost:4173`.  
The `dist/` folder produced by `npm run build` can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.).

### Supported browsers

| Browser | Version |
|---|---|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Apple Safari | 14+ |

---

## Platform 2 — Mobile (Phone or Tablet Browser)

The responsive layout switches automatically:

- **≤ 768 px** — sidebar collapses to a slide-in drawer, filter button appears in toolbar
- **≤ 480 px** — product grid goes to 2 columns

No separate build is needed. The same dev or production server serves the mobile view.

### Step 1 — Start the server with network access

```bash
npm run dev -- --host
```

Vite will print two URLs:

```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.x:5173/
```

> The **Network** URL is your machine's Wi-Fi IP. Run `ipconfig` (Windows) or `ifconfig` (macOS/Linux) to find it if it is not printed automatically.

### Step 2 — Connect your phone or tablet

1. Connect the phone/tablet to the **same Wi-Fi network** as this machine.
2. Open any browser on the device (Chrome for Android, Safari for iOS).
3. Navigate to the **Network URL** shown in the terminal, for example:
   ```
   http://192.168.1.7:5173/
   ```

### Step 3 — Interact with the mobile layout

- Tap the **Filters** button in the toolbar to open the sidebar drawer.
- The product grid, detail page, and cart drawer are all touch-friendly.

### Testing without a physical device (Chrome DevTools)

1. Open `http://localhost:5173/` in Chrome.
2. Press **F12** to open DevTools.
3. Click the **Toggle device toolbar** icon, or press **Ctrl + Shift + M**.
4. Select a device preset (iPhone 14, Pixel 7, Samsung Galaxy S21, iPad, etc.).
5. Refresh the page.

---

## Platform 3 — Desktop Native App (Electron)

Electron packages the app as a standalone `.exe` (Windows), `.app` (macOS), or binary (Linux).  
No browser or internet connection is required to run it.

### Step 1 — Install Electron dependencies

```bash
npm install --save-dev electron electron-builder concurrently wait-on
```

### Step 2 — Create the Electron entry point

Create the folder and file `electron/main.js` inside the `electronics-store` folder:

```js
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'CircuitStore',
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  })
  win.loadFile(path.join(__dirname, '../dist/index.html'))
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
```

### Step 3 — Add Electron scripts to package.json

Open `package.json` and add these entries inside `"scripts"`:

```json
"electron":     "npm run build && electron electron/main.js",
"electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron electron/main.js\"",
"dist:win":     "npm run build && electron-builder --win",
"dist:mac":     "npm run build && electron-builder --mac",
"dist:linux":   "npm run build && electron-builder --linux"
```

### Step 4 — Run as a native desktop app

**Option A — From the production build (recommended):**

```bash
npm run electron
```

This runs `npm run build` first, then opens the app in a native window.

**Option B — With live reloading during development:**

```bash
npm run electron:dev
```

Starts the Vite dev server and Electron simultaneously. Source file changes hot-reload inside the native window.

### Step 5 — Package into a distributable installer (optional)

Add a `"build"` section to `package.json` for electron-builder:

```json
"build": {
  "appId": "com.circuitstore.app",
  "productName": "CircuitStore",
  "directories": { "output": "release" },
  "files": ["dist/**/*", "electron/**/*"],
  "win":   { "target": "nsis" },
  "mac":   { "target": "dmg" },
  "linux": { "target": "AppImage" }
}
```

Build the installer for your platform:

```bash
npm run dist:win     # Windows — produces release/CircuitStore Setup.exe
npm run dist:mac     # macOS   — produces release/CircuitStore.dmg
npm run dist:linux   # Linux   — produces release/CircuitStore.AppImage
```

---

## Platform 4 — Native Mobile App via Capacitor (optional)

Capacitor wraps the same production build into an iOS or Android native app.

### Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
npx cap init CircuitStore com.circuitstore.app --web-dir dist
```

### Build and sync

```bash
npm run build
npx cap sync
```

### Open in the native IDE

```bash
npx cap open ios      # opens Xcode (macOS only — required for iOS)
npx cap open android  # opens Android Studio (Windows, macOS, or Linux)
```

Run on a connected device or emulator from within Xcode / Android Studio.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `http://localhost:5173` with hot-reload |
| `npm run dev -- --host` | Same as above but accessible on the local network (for mobile testing) |
| `npm run build` | Compile and bundle production output to `dist/` |
| `npm run preview` | Serve the production build locally for final verification |
| `npm run lint` | Run Oxlint static analysis on source files |

---

## Project Structure

```
electronics-store/
├── electron/
│   └── main.js               # Electron entry point (Platform 3)
├── public/
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx    # Slide-in cart with qty controls and totals
│   │   ├── Header.jsx        # Sticky header: logo, search bar, cart, wishlist
│   │   ├── LoginScreen.jsx   # Two-panel enterprise login page
│   │   ├── ProductCard.jsx   # Grid card and list card variants
│   │   ├── ProductDetail.jsx # Full detail page with specs table and qty selector
│   │   └── Sidebar.jsx       # Collapsible filter sidebar
│   ├── data/
│   │   └── products.js       # 32 product records across 10 categories
│   ├── App.css               # Full design system — tokens, layout, components, responsive
│   ├── App.jsx               # Root component — state, filtering, routing logic
│   ├── index.css             # CSS reset and base typography
│   └── main.jsx              # React DOM entry point
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Cross-Platform Compatibility Summary

| Method | Platforms covered | Additional setup required |
|---|---|---|
| `npm run dev` | Any desktop browser (Windows / macOS / Linux) | None |
| `npm run dev -- --host` | Any phone or tablet browser on the same Wi-Fi | None |
| Electron | Windows, macOS, Linux — runs as a native window | `npm install electron` |
| Capacitor | iOS and Android — native app store distribution | Xcode or Android Studio |
| Deploy to Netlify / Vercel | Any device with a browser, anywhere in the world | Free hosting account |

The same React source code and the same `dist/` build output is reused across every method — no separate codebases, no rewrites.
