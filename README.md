## GoodData test

Deployed to https://zhyrovdmytro.github.io/gooddata-test/

- To run the application locally: `yarn install` & `yarn start` - //localhost:3000
- To run tests: `yarn test` 
- To format code `yarn format`

### You has to be logged in to see data!

## GoodData.UI Accelerator Toolkit Application

This project was bootstrapped with [GoodData.UI Accelerator Toolkit](https://sdk.gooddata.com/gooddata-ui/docs/ht_create_your_first_visualization_toolkit.html).

-  To start the application on your workstation run the `npm run start` command.
-  To create a production build run the `npm run build` command.

This project uses the [Create React App](https://github.com/facebook/create-react-app) (CRA) scripts and infrastructure, you
can find the original documentation for CRA in [HOWTO.md](./HOWTO.md).

### Getting started

Before you can create visualizations for data in your workspace, you need to export its Logical Data Model (LDM). You can
then use the exported LDM entities to define the visualizations.

The export is simple: run the `npm run refresh-ldm` command.

-  This command will use information from [constants.ts](./src/constants.ts). It will connect to GoodData servers running
   on the host specified in the `backend` property and [export](https://sdk.gooddata.com/gooddata-ui/docs/gdc_catalog_export.html) LDM for the `workspace` of your choice.
-  If your configuration does not specify `workspace`, the script will prompt you to choose one of the workspaces available in the `backend`.

Once done, you will find that the [src/ldm/full.ts](./src/ldm/full.ts) file will be populated with attribute and measure definitions
matching the LDM defined in your workspace. You can then use these generated definitions as inputs to the different
[visualization components](https://sdk.gooddata.com/gooddata-ui/docs/start_with_visual_components.html) available in GoodData.UI SDK.

**Note: Before running this script, please make sure `backend` is defined in `constants.ts` file.**

**Hint: To avoid constantly typing in credentials, you can create `.gdcatalogrc` file where you define your `username` and `password`.**

### Deployment

There are two ways to deploy your application.

1. If your domain does not have CORS set up and you want to get up and running fast, you can use the pre-configured Docker image included with the app.
2. If the Docker way is not suitable for you, you can build and deploy the app manually (keep in mind that you will have to setup CORS on your GoodData domain so that it allows access from your application).

#### Using the built-in Docker support

The application comes with a simple Dockerfile. This image is a pre-configured nginx instance that both serves the application files and acts as a reverse proxy for your GoodData domain. In this deployment, your GoodData domain does not need any CORS setup because the application will only communicate with its origin server.
To use it, run these commands in your terminal:

```bash
# build production version of your application
npm run build
# build the docker image
docker build -t your-tag .
# run the docker image
docker run \
    --publish 3000:8080 \
    --name your-name \
    --env BACKEND_HOST="secure.gooddata.com" \
    --env BACKEND_URL="https://secure.gooddata.com" \
    your-tag:latest
```

The meaning of the `docker run` parameters is:

-   `--publish 3000:8080` ??? expose the nginx running on port 8080 by default (you can change that if needed by adding `--env PORT=5000`, just make sure you update the `--publish` value accordingly), to port 3000 on your machine.
-   `--name your-name` ??? assign a name to the container run.
-   `--env BACKEND_HOST="secure.gooddata.com"` and `--env BACKEND_URL="https://secure.gooddata.com"` ??? set the host/URL where the GoodData analytical backend is running respectively. You need to change these values if you host GoodData on a different domain.

#### Building and deploying manually

To deploy the application without the use of the provided Dockerfile, you can run

```bash
npm run build
```

which will create a `build` folder with all the build outputs that can you can then host anyway you want. Built like this, the application will assume that the GoodData Analytical Backend is hosted on the same host as the application itself.

In case you want to host the application on a host other than the one you use to host the GoodData Analytical Backend, you should build the application like this

```bash
npm run build-with-explicit-hostname
```

Built like this, the application will connect to the GoodData Analytical Backend hosted at the host specified in `src/constants.ts` in `backend` field.

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
