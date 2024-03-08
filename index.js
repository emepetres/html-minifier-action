const core = require("@actions/core");
// const github = require("@actions/github");
var minify = require("html-minifier").minify;

// Replace the content of the file with the minified HTML
function minifyFile(filePath, config, verbose = false) {
  const fs = require("fs");
  const content = fs.readFileSync(filePath, "utf8");
  const minifiedContent = minify(content, config);
  if (verbose) {
    console.log(`Minified ${filePath}`);
    console.log(`     Before: ${content.length} bytes`);
    console.log(`     After: ${minifiedContent.length} bytes`);
  }
  fs.writeFileSync(filePath, minifiedContent);
}

try {
  // get inputs
  const rootDir = core.getInput("rootDir");
  const verbose =
    core.getInput("verbose").toLowerCase() == "true" ? true : false;
  const minifyCSS = core.getInput("minifyCSS").toLowerCase() == "true";
  const minifyJS = core.getInput("minifyJS").toLowerCase() == "true";
  const flags = core.getInput("flags");

  // get all html files in the rootDir folder
  const fs = require("fs");
  const path = require("path");
  const basePath = path.resolve(process.env.GITHUB_WORKSPACE);
  const rootPath = path.join(basePath, rootDir);
  const files = fs.readdirSync(rootPath, { recursive: true });
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  // // if (minifyCSS) {
  // //   htmlFiles.push(...files.filter((file) => file.endsWith(".css")));
  // // }
  // // if (minifyJS) {
  // //   htmlFiles.push(...files.filter((file) => file.endsWith(".js")));
  // // }

  // add flags to minify config
  minifyConfig = {};
  const flagsList = flags.split(",").map((flag) => flag.trim());
  flagsList.forEach((flag) => {
    value = !flag.startsWith("!");
    flag = flag.replace("!", "");
    minifyConfig[flag] = value;
  });
  minifyConfig.minifyCSS = minifyCSS;
  minifyConfig.minifyJS = minifyJS;

  // minify each html file
  htmlFiles.forEach((file) => {
    const filePath = path.join(rootPath, file);
    minifyFile(filePath, minifyConfig, verbose);
  });

  // set htmlFiles relative to basePath
  const htmlFilesRelative = htmlFiles.map((file) =>
    path.relative(basePath, path.join(rootPath, file))
  );

  core.setOutput("minifiedFiles", htmlFilesRelative);
  // // // Get the JSON webhook payload for the event that triggered the workflow
  // // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
