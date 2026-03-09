import fs from "node:fs";

const required = [
  "app/dashboard/page.tsx",
  "app/presenca/page.tsx",
  "app/mensagens/page.tsx",
  "app/retornos/page.tsx"
];

for (const file of required) {
  if (!fs.existsSync(new URL(`../${file}`, import.meta.url))) {
    console.error(`Missing ${file}`);
    process.exit(1);
  }
}

console.log("Smoke test passed");
