import fs from "fs";
import https from "https";
import path from "path";
import puppeteer from "puppeteer";

const EXTERNAL_LINKS = [
  { url: "https://github.com/thesamgordon", mode: "screenshot" },
  { url: "https://ldg.sh/about", mode: "screenshot", scale: 2 },
  { url: "https://github.com/thesamgordon/fohs", mode: "opengraph", scale: 1 },
];

const OUTPUT_DIR = path.join(process.cwd(), "public", "previews", "external");

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: Status ${response.statusCode}`));
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

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const item of EXTERNAL_LINKS) {
    const safeName = item.url
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const destPath = path.join(OUTPUT_DIR, `${safeName}.png`);

    console.log(`Processing link target: ${item.url}`);

    try {
      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: item.scale || 1,
      });

      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
      );

      await page.goto(item.url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      if (item.mode === "opengraph") {
        const ogImageUrl = await page.evaluate(() => {
          const ogMeta =
            document.querySelector('meta[property="og:image"]') ||
            document.querySelector('meta[name="og:image"]') ||
            document.querySelector('meta[name="twitter:image"]');
          return ogMeta ? ogMeta.getAttribute("content") : null;
        });

        if (ogImageUrl) {
          console.log(`Found Open Graph image: ${ogImageUrl}`);
          await downloadImage(ogImageUrl, destPath);
        } else {
          console.warn(`No Open Graph image found for ${item.url}. Falling back to screenshot.`);
          await page.screenshot({ path: destPath, type: "png" });
        }
      } else {
        await page.screenshot({ path: destPath, type: "png" });
      }

      console.log(`Saved output target to: ${destPath}\n`);
    } catch (error) {
      console.error(`Error processing ${item.url}:`, error.message);
    }
  }

  await browser.close();
}

run();
