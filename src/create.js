const shelljs = require("shelljs");
const path = require("path");
const { log, err } = require("./log");

const dependencies = [
  "json",
  "typescript",
  "@types/node",
  "express",
  "@types/express",
  "helmet",
  "body-parser",
  "nodemon",
  "mocha",
  "@types/mocha",
  "chai",
  "@types/chai"
];

const scripts = [
  ["build", "tsc"],
  ["start", "node build/src/index.js"],
  ["dev", "nodemon node build/src/index.js"],
  ["clean", "rm -rf ./build"],
  ["test", "mocha build/tests/index.test.js"]
];

const createService = async service => {
  try {
    log(`Creating service ${service}`);
    shelljs.exec(`rm -rf ${service}`);
    shelljs.exec(`mkdir ${service}`);
    shelljs.cd(service);

    log("Initializing npm repository");
    shelljs.exec("npm init -y");

    dependencies.forEach(dependency => {
      log(`Installing ${dependency}`);
    });
    shelljs.exec(`npm i ${dependencies.join(" ")}`);

    log("Editing scripts inside of package.json");
    scripts.forEach(script => {
      shelljs.exec(
        `npx json -I -f package.json -e 'this.scripts.${script[0]}="${
          script[1]
        }"'`
      );
    });

    log("Creating Dockerfile");
    shelljs.exec(
      `cp ${path.join(__dirname, "entities", "Dockerfile")} Dockerfile`
    );

    log("Creating .dockerignore file");
    shelljs.exec(
      `cp ${path.join(__dirname, "entities", ".dockerignore")} .dockerignore`
    );

    log("Creating typescript configuration");
    shelljs.exec(
      `cp ${path.join(__dirname, "entities", "tsconfig.json")} tsconfig.json`
    );

    log("Creating src folder");
    shelljs.mkdir("src");

    log("Creating index script");
    shelljs.exec(
      `cp ${path.join(__dirname, "entities", "index.ts")} src/index.ts`
    );

    log("Creating routes folder");
    shelljs.mkdir("src/routes");

    log("Creating BasicRouter script");
    shelljs.exec(
      `cp ${path.join(
        __dirname,
        "entities",
        "BasicRouter.ts"
      )} src/routes/BasicRouter.ts`
    );

    log("Creating tests folder");
    shelljs.mkdir("tests");

    log("Creating index test script");
    shelljs.exec(
      `cp ${path.join(
        __dirname,
        "entities",
        "index.test.ts"
      )} tests/index.test.ts`
    );

    log("Creating sample test script");
    shelljs.exec(
      `cp ${path.join(
        __dirname,
        "entities",
        "sample.test.ts"
      )} tests/sample.test.ts`
    );

    log("Available npm scripts:");
    shelljs.exec("npm run");
  } catch (e) {
    err(e);
  }
};

module.exports = {
  createService
};
