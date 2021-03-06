:warning: DEPRECATED :warning:

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

> **Note**: To be able to run the script, you'll need to run once `chmod u+x scripts/deploy.sh`

### Conventions

**Why every file is named index?**

There are a few reasons that led to this choice:
- To ease refactoring. It is pretty common that one wants to refactor a component into subcomponents to improve code
readability and reusability. If everything regarding a component is already grouped under a folder, the folder structure doesn't need to be changed to accomodate new subcomponents.
- A major part of the project consists in the development of React components, that are divided between JSX
representation and style. Therefore a components is better represented as a folder that contains this two parts, the
folder name being the component name.
- Following the first two reasons, the choice of using index as a name is to avoid verbosity since webpack is able to resolve the right file using just the folder name.

### DevTools
This template is ready to be used with [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) ([GitHub](https://github.com/zalmoxisus/redux-devtools-extension))
