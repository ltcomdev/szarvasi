import fs from "node:fs";

const base = "C:/LTCOM DEV/Szarvasi Mozarella/public/";
const pages = ["index.html","termekek.html","rolunk.html","media.html","receptjeink.html","high-protein.html"];

const OLD_PNG = `<div class="footer-wave">
      <img src="assets/images/footer-hullam.png" alt="" aria-hidden="true">
    </div>`;

const NEW_SVG = `<div class="footer-wave">
      <img src="assets/images/footer-hullam.svg" alt="" aria-hidden="true">
    </div>`;

for (const p of pages) {
  const path = base + p;
  let c = fs.readFileSync(path, "utf8");
  if (c.includes(OLD_PNG)) {
    fs.writeFileSync(path, c.replace(OLD_PNG, NEW_SVG), "utf8");
    console.log("OK", p);
  } else {
    console.log("SKIP (pattern not found)", p);
  }
}
