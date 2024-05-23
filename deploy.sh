 name: Deploy to Github Pages
  on:
    push:
      branches:
        - main
  jobs:
    gh-pages-deploy:
      name: Deploying to Github Pages
      runs-on: ubuntu-latest
      steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-node@v2
            with:
              node-version: '12'
          - name: Install packages
            run: npm i
          - name: Set Creds
            run: git config user.name "<roemphith>" && git config user.email "<phithroem123abc007bmcinclude@gmail.com>"
          - name: Deploy
            run: npm run deploy