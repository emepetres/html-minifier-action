# html-minifier-action

Action to use [HTMLMinifier](https://github.com/kangax/html-minifier) on Github Actions

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: emepetres/html-minifier-action
with:
  who-to-greet: 'Mona the Octocat'
```
