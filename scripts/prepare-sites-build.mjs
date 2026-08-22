import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const serverDir = path.join(distDir, "server");
const openAiDir = path.join(distDir, ".openai");

if (!fs.existsSync(path.join(distDir, "index.html"))) {
  throw new Error("Vite build output is missing dist/index.html.");
}

fs.mkdirSync(serverDir, { recursive: true });
fs.mkdirSync(openAiDir, { recursive: true });

fs.copyFileSync(
  path.resolve(".openai", "hosting.json"),
  path.join(openAiDir, "hosting.json"),
);

fs.writeFileSync(
  path.join(serverDir, "index.js"),
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
`,
  "utf8",
);

console.log("Prepared Sites build output.");
