import fs from "fs";
import https from "https";
import path from "path";

const EXTERNAL_LINKS = [
  { url: "https://github.com/thesamgordon", mode: "screenshot" },
  { url: "https://ldg.sh/about", mode: "screenshot", scale: 2 },
  { url: "https://github.com/thesamgordon/fohs", mode: "opengraph", scale: 1 },
];

const OUTPUT_DIR = path.join(process.cwd(), "public", "previews", "external");

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download: Status ${response.statusCode}`),
          );
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(destPath, () => reject(err));
      });
  });
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const item of EXTERNAL_LINKS) {
    const safeName = item.url
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const destPath = path.join(OUTPUT_DIR, `${safeName}.png`);

    console.log(`Processing link target: ${item.url}`);

    try {
      let viewportOpts;

      if (item.scale) {
        viewportOpts = encodeURIComponent(
          JSON.stringify({
            width: 1920,
            height: 1080,
            deviceScaleFactor: item.scale,
          }),
        );
      }

      const url = item.scale
        ? `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url&viewport=${viewportOpts}`
        : `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url`;

      const targetImageUrl =
        item.mode === "opengraph"
          ? `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&image=true&embed=image.url`
          : url;

      await downloadFile(targetImageUrl, destPath);
      console.log(`Saved output map target to: ${destPath}\n`);
    } catch (error) {
      console.error(
        `Execution error compiling assets for target ${item.url}:`,
        error.message,
      );
    }
  }
}

run();
