import fs from "fs";
import path from "path";

const dir = "./src";

function removePrismFromFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  const patterns = [
    /import\s+['"]prismjs.*?;?/g,
    /import\s+Prism.*?;?/g,
    /Prism\.highlightAll\(\);?/g
  ];

  patterns.forEach((p) => {
    content = content.replace(p, "");
  });

  fs.writeFileSync(filePath, content);
  console.log("✔ Cleaned:", filePath);
}

function walk(dirPath) {
  for (const file of fs.readdirSync(dirPath)) {
    const full = path.join(dirPath, file);
    if (fs.lstatSync(full).isDirectory()) walk(full);
    else if (full.endsWith(".jsx") || full.endsWith(".js")) {
      removePrismFromFile(full);
    }
  }
}

walk(dir);
console.log("✅ Done");
