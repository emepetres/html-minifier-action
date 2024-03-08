# How to contribute

Github actions cannot be tested locally and therefore can only be tested by pushing to a repository.
To test this action, setup your environment as follows, then make changes, build and push to a new branch.
Output can be seen in the private workflow of the repository.
Once you are happy with your changes, create a pull request.

## Local setup

```bash
nvm install 20
nvm use 20
npm i -g @vercel/ncc
npm install
```

## Build & test on github

```bash
ncc build index.js --license licenses.txt
git add .
git commit -m "[changes description]"
git tag -a -m "[Version description]" [v1.1]
git push --follow-tags
```
