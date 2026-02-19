import fs from "node:fs";

const base = "C:/LTCOM DEV/Szarvasi Mozarella/public/";
const pages = ["index.html","termekek.html","rolunk.html","media.html","receptjeink.html","high-protein.html"];

const OLD = `<div class="footer-wave">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C360,80 720,0 1080,48 C1260,72 1380,24 1440,40 L1440,80 L0,80 Z" fill="#fcf7d8"/>
      </svg>
    </div>`;

const NEW = `<div class="footer-wave">
      <img src="assets/images/footer-hullam.png" alt="" aria-hidden="true">
    </div>`;

for (const p of pages) {
  const path = base + p;
  let c = fs.readFileSync(path, "utf8");
  if (c.includes(OLD)) {
    fs.writeFileSync(path, c.replace(OLD, NEW), "utf8");
    console.log("OK", p);
  } else {
    console.log("SKIP", p);
  }
}
