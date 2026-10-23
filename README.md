# RPG Plus website

A static Minecraft modpack site using plain HTML, CSS, and JavaScript. No build
step or dependencies are required.

## Run locally

From this directory, run `python -m http.server 8000`, then open
<http://localhost:8000> **on the same computer**. A server in a remote cloud
workspace needs port forwarding or hosting to be reachable from your browser.

## Where to make changes

- `index.html`: homepage content, shared SVG icons, save-file panel, feature chapters, progression path, patch notes, guide introduction, and FAQ.
- `guide.html`: standalone getting-started guide with chapter links. Its navbar/footer use explicit links back to `index.html` sections.
- `style.css`: colors, typography, and spacing tokens in `:root`, then component styles. Tablet/phone overrides and reduced-motion rules are at the end.
- `script.js`: deferred script with one initialization function per interaction. Handles the mobile menu, scroll background, one-time reveals, level counter, and single-open FAQ accordion.
- `Logo V3 trans.png`: original supplied shield; used in navigation, the save-file panel, favicon, and footer.
- `assets/`: local scenery, a lightweight stone-grain SVG, and locally stored Modrinth/GitHub/Discord brand marks. No external image service is needed.

The save file is an illustrative character preview, not live player data. Without
JavaScript, the page content, navigation links, FAQ answers, and final level remain
available. Reveals and the level counter respect reduced motion. Escape closes
the mobile menu and returns focus to its toggle.

## Update the modpack patch notes

Find the `PATCH NOTES` comment or `id="patch-notes"` in `index.html`. The entire
release is in that one section and renders without JavaScript:

1. Change the text inside `.patch-notes__version` (currently `v1.4.2`).
2. Replace the `patchReleaseTitle` heading and `.patch-notes__summary` paragraph
   when you have release notes. They currently show a “coming soon” state.
3. Add one `<li>` per change inside `.patch-notes__list`. For example:

```html
<ul class="patch-notes__list">
  <li>Your first actual patch note.</li>
  <li>Your next actual patch note.</li>
</ul>
```

4. Put the patch’s backdrop image in `assets/` and update `--patch-background`
   on the opening `<section id="patch-notes">` tag. For example:

```html
style="--patch-background: url('assets/patch-1.4.3.png')"
```

The section keeps a dark overlay for readable text over each new backdrop.
No build, account, or public editing controls are needed. Patch Notes in both
navbars links to this full-width scenic section.

## Edit the guide

Edit the seven chapter sections in `guide.html`. Keep each section’s `id` in sync
with the matching link in `.guide-contents`. Both the homepage title and its
“Read the guide” button open this page, as does Guide in the navbar. The
homepage introduction uses an open journal layout; its three chapter rows
link directly to installation, the first night, and dungeons.

## Links and motion

- GitHub in the hero links to <https://github.com/TheSpiffyOne/RPG-Plus>.
- Every Modrinth download link includes the green Modrinth mark.
- The Donate button, below the closing invitation, is an intentional disabled
  placeholder for lava.top. Find `donationButton` in `index.html`; when ready,
  replace that button with an `<a>` containing your URL and remove `disabled`,
  `aria-describedby`, and the adjacent “Coming soon” message.
- Hero motion uses CSS transforms/opacity for landscape drift, mist, floating
  rune sparks, the crest, and an introductory reveal. The version dot pulses.
  “Pause motion” pauses decorative animation; it also pauses when the hero leaves
  the viewport. Reduced motion disables these effects and hides the control.
- Captions and labels are at least 12px at the default browser size; body copy is
  generally 15–16px. Type uses rem units so browser font preferences scale it.

The Modrinth, GitHub, and Discord SVG marks are from
[Simple Icons](https://github.com/simple-icons/simple-icons/tree/develop/icons),
with fill colors set to suit the site. The Modrinth mark matches the supplied
brand reference.

## Artwork

`assets/minecraft.png` is the grass-block mark used beside the Minecraft version.
It is stored locally, sourced from
[Dashboard Icons](https://github.com/homarr-labs/dashboard-icons/blob/main/png/minecraft.png)
to match the supplied grass-block reference.


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
- Pause/resume hero motion and verify it pauses when scrolled out of view.
- Verify the GitHub destination and Modrinth icons; Donate stays disabled until its URL is supplied.
- Check reduced motion, keyboard focus, and content with JavaScript disabled.
- Open Guide from the navbar and homepage title. Follow chapter links and return
  to the homepage and patch notes. Verify `v1.4.2` and the pending-notes state.

The redesign was checked in Chromium at 320, 375, 640, 768, 820, 1024, 1440, and
1920 pixels wide, including the interactions and fallback states above.
