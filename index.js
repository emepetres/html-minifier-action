const core = require("@actions/core");
// // const github = require("@actions/github");
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

  // get all html files in the rootDir folder
  const fs = require("fs");
  const path = require("path");
  const rootPath = path.join(process.cwd(), "..", rootDir);
  const files = fs.readdirSync(rootPath, { recursive: true });
  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  // minify config
  const minifyConfig = {
    removeAttributeQuotes: true,
  };

  // minify each html file
  htmlFiles.forEach((file) => {
    const filePath = path.join(rootPath, file);
    minifyFile(filePath, minifyConfig, verbose);
  });

  core.setOutput("minifiedFiles", htmlFiles);
  // // // Get the JSON webhook payload for the event that triggered the workflow
  // // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
