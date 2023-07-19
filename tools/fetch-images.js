import { specs } from "../src/data/specs.js";
import { promises as fs } from "fs";
import URL from "url";
import path from "path";
import fetch from "node-fetch";

/*
  class_emote: "579532030056857600",
  spec_emote: "637564379847458846",
  role_emote: "592438128057253898",
*/
const dirname = path.dirname(URL.fileURLToPath(import.meta.url));

async function run() {
  const ids = [];
  const keys = ["class_emote", "spec_emote", "role_emote"];
  for (const spec of specs) {
    for (const key of keys) {
      const id = spec[key];
      if (!ids.includes(id)) {
        ids.push(id);
      }
    }
  }
  for (const id of ids) {
    const url = `https://cdn.discordapp.com/emojis/${id}.png?v=1`;
    const response = await fetch(url);
    const buffer = await response.buffer();
    const filePath = path.join(dirname, "../web/images", `${id}.png`);
    await fs.writeFile(filePath, buffer);
  }
}
run();
