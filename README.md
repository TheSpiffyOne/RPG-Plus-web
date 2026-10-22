# RPG Plus website

A static Minecraft modpack site using plain HTML, CSS, and JavaScript. No build
step or dependencies are required.

## Run locally

From this directory, run `python -m http.server 8000`, then open
<http://localhost:8000> **on the same computer**. A server in a remote cloud
workspace needs port forwarding or hosting to be reachable from your browser.

## Where to make changes

- `index.html`: page content, navigation, shared SVG icons, save-file preview, feature chapters, progression path, and FAQ.
- `style.css`: colors, typography, and spacing tokens in `:root`, then component styles. Tablet/phone overrides and reduced-motion rules are at the end.
- `script.js`: deferred script with one initialization function per interaction. Handles the mobile menu, scroll background, one-time reveals, level counter, and single-open FAQ accordion.
- `Logo V3 trans.png`: original supplied shield; used in navigation, the save-file panel, favicon, and footer.
- `assets/`: local scenery and a lightweight stone-grain SVG. No external image service is needed.

The save file is an illustrative character preview, not live player data. Without
JavaScript, the page content, navigation links, FAQ answers, and final level remain
available. Reveals and the level counter respect reduced motion. Escape closes
the mobile menu and returns focus to its toggle.

## Artwork

`assets/ruined-valley.png` and `assets/adventure-scenes.png` are generated concept
art placeholders, not screenshots of the modpack. Replace them with your own
in-game screenshots when available. The feature image is a three-panel atlas:
left = world, middle = dungeon, right = boss. The `.chapter-card__art` rules select
panels with `background-position` and `background-size: 300% auto`. If using
individual screenshots, give each modifier its own background image and use
`background-size: cover`.

## Verify changes

- Run `node --check script.js` and `git diff --check`.
- Check desktop, tablet, and narrow phone widths for wrapping and overflow.
- Open/close the mobile menu, select a link, and close it with Escape.
- Verify the scroll background, reveal animations, and level counter ending at 47.
- Open an FAQ answer, open another, and close it. Resize with an answer open.
- Check reduced motion, keyboard focus, and content with JavaScript disabled.

The redesign was checked in Chromium at 320, 375, 640, 768, 820, 1024, 1440, and
1920 pixels wide, including the interactions and fallback states above.
