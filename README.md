# RPG Plus website

A static site using plain HTML, CSS, and JavaScript. No build step or dependencies are required.

## Run locally

From this directory, run `python -m http.server 8000`, then open
<http://localhost:8000> in a browser.

## Where to make changes

- `index.html`: page content, section markup, navigation links, and inline SVG icons.
- `style.css`: design tokens in `:root`, followed by shared styles and component sections. Responsive rules sit near the components they affect. Preserve rule order when editing: later rules can override earlier ones.
- `script.js`: one initialization function per interaction, called at the top of the file. The script loads at the end of the HTML so the DOM is available immediately.
- `Logo V3 trans.png`: supplied logo asset.

The JavaScript handles the mobile menu, navigation scroll background, one-time
scroll reveals, the animated level counter, and the single-open FAQ accordion.
Reveals and the level counter respect the reduced-motion preference.

## Verify changes

Run `node --check script.js` for JavaScript syntax. In a browser, check the mobile
menu (including closing after selecting a link), the navigation background after
scrolling, section reveals, the level counter, and opening/closing FAQ answers.
Also check a narrow viewport and the reduced-motion setting.
