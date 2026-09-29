// GitHub Pages has no server-side routing. Copying index.html to 404.html makes
// deep links (e.g. /work/safar) and page refreshes load the app instead of a 404.
import { copyFileSync, writeFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
writeFileSync("dist/.nojekyll", "");
console.log("postbuild: created dist/404.html and dist/.nojekyll");
