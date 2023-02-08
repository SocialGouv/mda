import strapi from "@strapi/strapi";
import { Command } from "commander";

import { generateSchemasDefinitions } from "./schemas";

interface GenerateTypesOptions {
  file: string;
  outDir: string;
  silent: boolean;
  verbose: boolean;
}
async function generateTypes({ file, verbose, silent }: GenerateTypesOptions) {
  if (verbose && silent) {
    console.error("You cannot enable verbose and silent flags at the same time, exiting...");
    process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- it's here, but poorly typed
  const appContext = await (strapi as any).compile();
  const app = await strapi(appContext).register();

  await generateSchemasDefinitions({
    strapi: app,
    file,
    verbose,
    silent,
  });

  app.destroy();
}

const program = new Command();
program.storeOptionsAsProperties(false).allowUnknownOption(true);
program.helpOption("-h, --help", "Display help for command");
program.addHelpCommand("help [command]", "Display help for command");

program
  .command("ts:generate-types", { isDefault: true })
  .description(`Generate TypeScript typings for your schemas`)
  .option("-o, --out-dir <outDir>", "Specify a relative directory in which the schemas definitions will be generated")
  .option("-f, --file <file>", "Specify a filename to store the schemas definitions")
  .option("--verbose", `Display more information about the types generation`, false)
  .option("-s, --silent", `Run the generation silently, without any output`, false)
  .action(generateTypes);

void program.parseAsync(process.argv);
