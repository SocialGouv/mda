import fs from "fs";
import path from "path";

export const filePath = path.join(__dirname, "../public/robots.txt");

export const generateRobotsTxt = (isOnProduction: boolean, host: string) => {
  const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
  const robotsProd = ["User-agent: *", "Allow: /", "", `Sitemap: https://${host}/sitemap.xml`].join("\n");

  const robot = isOnProduction ? robotsProd : robotsDev;

  fs.writeFileSync(filePath, robot);
};

const run = () => {
  generateRobotsTxt(
    process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT ? true : false,
    process.env.NEXT_PUBLIC_SITE_URL ?? "localhost",
  );
  console.log("Robots.txt generated.");
};

run();
