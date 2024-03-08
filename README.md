# HTMLMinifier Action
[![GitHub release](https://img.shields.io/github/release/emepetres/html-minifier-action.svg?color=orange)](https://gitHub.com/emepetres/html-minifier-action/releases/)
[![MIT license](https://img.shields.io/github/license/emepetres/html-minifier-action.svg?color=blue)](https://github.com/emepetres/html-minifier-action/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Action to use [HTMLMinifier](https://github.com/kangax/html-minifier) on Github Actions

## Usage

Add the following step to your workflow file, just before deploying your HTML files.

```yaml
- uses: emepetres/html-minifier-action@v1
```

## Inputs

### `rootDir`

**Optional** Path to root directory containing HTML files. Default `"."`.

### `verbose`

**Optional** Prints minification details. Default `false`.

### `minifyCSS`

**Optional** Minify CSS in style elements and style attributes. Default `true`.

### `minifyJS`

**Optional** Minify JavaScript in script elements and event attributes. Default `true`.

### `flags`

**Optional** Additional flags to pass to HTMLMinifier, separted by comma. See [docs](https://github.com/kangax/html-minifier#options-quick-reference). Use ! to indicate false value of a flag..

## Outputs

### `minifiedFiles`

The files minified, relative to repository root.

## Example usage

```yaml
- name: HTMLMinifier
  uses: emepetres/html-minifier-action@v1
  id: html-minifier
  with:
    rootDir: "src"
    verbose: true
    flags: "collapseWhitespace, removeComments, removeOptionalTags, removeRedundantAttributes, removeScriptTypeAttributes, removeTagWhitespace, useShortDoctype, removeAttributeQuotes"
- name: Get the minfied files from output
  run: echo "The files minfied are ${{ steps.html-minifier.outputs.minifiedFiles }}"
```
