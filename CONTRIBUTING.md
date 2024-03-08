# How to contribute

The action can be tested through its private workflow.
To contribute, setup your environment as follows, improve it, build and push to a new branch.
Output can be seen in the private workflow of the repository.
Once you are happy with your changes, create a pull request.

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request)

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
git tag -a -m "[Version description]" [v1]
git push --follow-tags
```
