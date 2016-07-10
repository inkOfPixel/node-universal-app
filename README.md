# node-universal-app
Node+MongoDB+Redux+React universal app template.

This template project is designed to work with Openshift right out of the box.

## Usage

Start a project based on this template:

1. Create a new repo for the project
2. Clone this repo locally
3. Change remote to new repo (e.g. `git remote set-url origin https://github.com/inkOfPixel/example.git`)
4. Push (`git push origin master`)

> **Note**: This procedure has yet to be tested. Once it proofs that it works, creating a script could speed the process.

After running `npm install` to install required dependencies you need to check the file `src/config.js` to config your project variables (like the MongoDB local db name).

### Development

To serve the website locally run:
```sh
npm run start:dev
```

### Production

In order to deploy the app to a production Openshift gear, you must add the add the Openshift remote naming it "production".

To start the deployment process run:
```sh
npm run deploy:production
```

### Conventions

**Why every file is named index?**
There are a few reasons that led to this choice:
- To ease refactoring. It is pretty common that one wants to refactor a component into subcomponents to improve code
readability and reusability.
- A major part of the project consists in the development of React components, that are divided by between JSX
representation and style. Therefore a components is better represented as a folder that contains this two parts, the
folder name being the component name.

### DevTools
This template is ready to be used with [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) ([GitHub](https://github.com/zalmoxisus/redux-devtools-extension))
