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
   for the next release. The current grouped notes describe v1.4.2.
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
with the matching link in `.guide-contents`. The homepage combines the guide introduction and FAQ in one getting-started
section, with a plain guide heading and a single “Read the guide” button. Guide in the navbar
also opens this page. Chapter navigation lives on the guide page itself.

## Links and motion

- GitHub in the hero links to <https://github.com/TheSpiffyOne/RPG-Plus>.
- Every Modrinth download link includes the green Modrinth mark.
- Donate in the hero and closing section links to <https://app.lava.top/spiffy?tabId=donate>.
- The warm gold interface palette uses `--c-accent` in `style.css`, with matching
  amber button surfaces, XP fills, particles, focus rings, links, and hover glows.
  Brand marks and scene artwork keep their original colors.
- Hero motion uses CSS transforms/opacity for landscape drift, mist, floating
  rune sparks, the crest, and an introductory reveal. The version dot pulses.
  “Pause motion” pauses decorative animation; it also pauses when the hero leaves
  the viewport. Reduced motion disables these effects and hides the control.
- Captions and labels are at least 12px at the default browser size; body copy is
  generally 15–16px. Type uses rem units so browser font preferences scale it.

## Pixel icons and version font

Both HTML pages include the same 16×16 SVG symbol set. Each glyph uses square
pixels and inherits its color from CSS. Discord, GitHub, and Modrinth use their original vector logos and brand colors. Update both symbol blocks when changing an icon.

Minecraft version labels use the locally hosted **Monocraft** font, a Minecraft-
inspired font by IdreesInc. Its OFL license is in `assets/fonts/Monocraft-LICENSE.txt`.
Source: <https://github.com/IdreesInc/Monocraft>.

## Add guide images

Find `IMAGE SLOT` comments in `guide.html`. Replace a placeholder div with a normal
`<img>` pointing to your screenshot; keep its surrounding figure and caption.
See `assets/guide/README.md` for an example. There are slots for installation,
controls, skills, and video settings, with no missing image requests until supplied.

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
- Verify the GitHub destination, pixel glyphs, and both working lava.top donation links.
- Check reduced motion, keyboard focus, and content with JavaScript disabled.
- Open Guide from the navbar and homepage “Read the guide” button. Follow chapter links and return
  to the homepage and patch notes. Verify `v1.4.2` and the published release notes.

The redesign was checked in Chromium at 320, 375, 640, 768, 820, 1024, 1440, and
1920 pixels wide, including the interactions and fallback states above.
