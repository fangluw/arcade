# Carmen's Arcade (Svelte 5 + SvelteKit)

My CS5610 site: a home page, About and Contact pages, a mini crossword, and 2048.
The 2048 rules come from my npm package,
[`@fangluw/arcade-core`](https://www.npmjs.com/package/@fangluw/arcade-core), installed from the registry.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in build/
npm run preview    # serve the built site
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). In the repository settings, set
**Pages → Source** to **GitHub Actions**. The workflow sets `BASE_PATH` to
`/<repo-name>`, and every internal link goes through `resolve()` or `asset()`
from `$app/paths`, so the site works from that sub-folder.

## Where things live

```
src/
  app.html                 page shell (fonts, favicon)
  app.css                  design tokens (colour ramp, type scale, spacing scale) + global element styles
  routes/                  one folder per page (file-based routing)
    +layout.svelte         header, <main>, footer around every page
    +error.svelte          404 and error page
    +page.svelte           Home  (/)
    about/+page.svelte     About (/about)
    contact/+page.svelte   Contact (/contact)
    crossword/+page.svelte Mini Crossword (/crossword)
    2048/+page.svelte      2048 (/2048)
  lib/
    attachments/
      swipe.js             {@attach swipe(...)}: reports swipe directions on the 2048 board
    data/                  site content: nav + games, profile, crossword answers & clues
    crossword/
      puzzle.js            builds the grid from the answer list (plain JS)
      game.svelte.js       CrosswordGame class: all game state, using runes
    game2048/
      game.svelte.js       Game2048 class: score, seed, saving; rules come from @fangluw/arcade-core
      stats.svelte.js      best score, shared by the game and the home page
      tiles.js             gives tiles stable ids between moves so they slide (plain JS)
      announce.js          the sentences read to screen readers after each move (plain JS)
      storage.js           safe localStorage helpers
    components/
      layout/              SiteHeader, NavBar, NavLink, SiteFooter, PageMeta
      content/             Section, InfoCard, CardSection, ProfileIntro, ContactList
      ui/                  Button
      crossword/           Crossword, CrosswordGrid, CrosswordCell,
                           CrosswordControls, GameStatus, ClueList
      game2048/            Game, ScoreBoard, Board, Tile, GameOverlay, ArrowPad,
                           SeedForm, LiveRegion
```

## Adding a game

1. Add an entry to `games` in `src/lib/data/site.js` (it shows up in the nav bar and on the home page).
2. Create `src/routes/<your-game>/+page.svelte`.

## 2048 controls

Arrow keys slide the tiles. On a touch screen (or a narrow window), swipe the
board or use the on-screen arrows. **New game** resets the score; the best
score is kept. Reaching 2048 offers **Keep playing**. The current game and best
score are saved in `localStorage`, so closing the tab doesn't lose them.
Every game has a seed; entering the same seed and making the same moves gives
the same tiles.

Screen-reader users hear each move, merge, score change, new tile and the
end of the game through a live region, and can read the whole board as a table.

## Crossword controls

Type to fill squares; the cursor moves through the word. Arrow keys move (pressing
across the current direction turns first), Space or clicking the active square switches
Across/Down, Backspace clears and steps back. Clicking a clue jumps to it.
**Reveal solution** shows the answers without erasing
your letters, **Clear** starts over.
