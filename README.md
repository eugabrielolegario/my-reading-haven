# OPUS LIBRIS

A personal web app to manage my home library — built because spreadsheets got unwieldy and I don't trust mobile apps with years of reading history.

This is an internal tool, not a product. It's not designed to be installed or used by anyone else. The code is public for reference only.

I write about books, reading, and ideas on my Substack → [opuslibris.substack.com](https://opuslibris.substack.com/?utm_source=github&utm_medium=readme&utm_campaign=opus_libris)

---

## Why this exists

I've been tracking my reading in a spreadsheet for years: books read, ratings, dates, notes, quotes. It works, but it doesn't scale well and has no real interface. Mobile apps like Goodreads or StoryGraph are convenient but I've had data disappear, features change, or accounts become inaccessible. I wanted something I own and control, that runs locally, with no accounts or syncing to worry about.

Opus Libris is that. A catalog and dashboard that lives in the browser, imports from my existing spreadsheet, and lets me manage everything in one place.

---

## Features

### 📊 Dashboard

The main view. Designed to give a real picture of reading habits over time, not just a book count.

- **Core KPIs** — total books in the library, books read this year, total pages consumed, average rating across all books, and favorite genre by volume
- **Currently Reading** — book in progress with current page, total pages, and a visual progress bar
- **Reading Pace** — average pages/day over the last 30 days, with a projected finish date for the current book ("At this pace, you'll finish in X days")
- **Annual Reading Challenge** — progress bar toward a yearly goal; user sets the target number in settings
- **Genre Bubble Chart** — books per genre rendered as sized bubbles, proportional to volume
- **Reading Timeline** — all completed books plotted horizontally by finish date
- **Top Authors** — ranked by number of books read, with average rating per author
- **Recently Added** — editorial-style section showing the last 5 books added to the library
- **Saved Quotes** — total quote count with a preview of the most recently saved one

### 📚 Catalog

The full library browser. Supports both a cover-dominant grid and a compact table view.

- Toggle between **grid view** (big covers, title, author, status badge) and **table view** (dense, all fields visible)
- **Filters** by genre, reading status, star rating, and year read — combinable
- **Search** by title or author name
- **Sort** by date added, title, author, rating, or year
- Hover on any card to reveal a quick-edit icon and the star rating
- **Empty states** display a literary quote instead of a generic "no results" message
- Archived books hidden by default, with a toggle to reveal them

### ✏️ Book Management

Full create, edit, and delete support — no read-only records.

**Adding a book** — manual form with all fields:
- Title, Author
- Genre (dropdown)
- Status: `Reading` / `Completed` / `To Read` / `Abandoned`
- Total pages and current page (for in-progress books)
- Star rating (1–5)
- Start date and end date
- Cover image URL
- Free-text notes

**Editing a book** — clicking any book opens a right-side drawer with all fields editable. Changes save immediately.

**Deleting a book** — trash icon inside the edit drawer triggers a confirmation modal before permanent removal.

**Archiving a book** — soft-delete option that hides the book from the catalog without losing any data. Archived books are accessible via a toggle in the catalog view.

### 💬 Quotes & Annotations

Per-book quote saving, aggregated at the dashboard level.

- Save any passage with the quote text, page number, and chapter reference
- Quotes visible inside the book detail drawer under a dedicated tab
- Dashboard shows total quote count and previews the most recently saved one
- Deletable individually

### 🗂️ Collections

Custom shelves beyond the default genre grouping.

- Create named collections (e.g. "French Philosophy", "To Lend", "Re-read Candidates")
- Assign any book to one or more collections
- Collections listed in the sidebar for quick access

### 📋 Wishlist

A dedicated space for books not yet owned or started — kept separate from the main library so it doesn't inflate stats.

### 📁 Import / Export

Built to migrate from a spreadsheet and stay exportable.

- **Import CSV** — upload any `.csv` file, then map columns to app fields (title, author, status, pages, rating, dates, etc.) before importing. Handles messy column names.
- **Export CSV** — dumps the full library with all fields to a `.csv` file instantly. Safe to re-import after edits in Excel.

### ⌨️ Interface

- **Global search** via `Cmd+K` — searches across all books, authors, genres, and saved quotes simultaneously
- **Collapsible sidebar** — icons only when collapsed, icons + labels when expanded
- **Dark mode only** — permanently, no toggle
- **Settings page** — set display name, annual reading goal, and preferred genres list

---

## Stack

React + TypeScript + Tailwind CSS + shadcn/ui, bundled with Vite. Built with [Lovable](https://lovable.dev).

---

## Running locally

```bash
npm install
npm run dev
```
