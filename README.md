# html-minifier-action

Action to use [HTMLMinifier](https://github.com/kangax/html-minifier) on Github Actions

## Inputs

### `rootDir`

**Optional** Path to root directory containing HTML files. Default `"."`.

### `verbose`

**Optional** Prints minification details. Default `false`.

### `minifyCSS`

**Optional** Minify CSS in style elements and style attributes. Default `true`.

### `minifyJS`

**Optional** Minify JavaScript in script elements and event attributes. Default `true`.

## Outputs

### `minifiedFiles`

The files minified, relative to repository root.

## Example usage

```yaml
- name: HTMLMinifier
  uses: emepetres/html-minifier-action
  id: html-minifier
  with:
    rootDir: "src"
    verbose: true
- name: Get the minfied files from output
  run: echo "The files minfied are ${{ steps.html-minifier.outputs.minifiedFiles }}"
```
