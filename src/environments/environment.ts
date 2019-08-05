// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = {
  "name": "angular",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "@angular-extensions/model": "^8.0.0",
    "@angular/animations": "~8.0.0",
    "@angular/cdk": "~8.0.0",
    "@angular/common": "~8.0.0",
    "@angular/compiler": "^8.0.3",
    "@angular/core": "~8.0.0",
    "@angular/forms": "~8.0.0",
    "@angular/http": "^8.0.0-beta.10",
    "@angular/material": "~8.0.0",
    "@angular/platform-browser": "~8.0.0",
    "@angular/platform-browser-dynamic": "~8.0.0",
    "@angular/router": "~8.0.0",
    "@fortawesome/angular-fontawesome": "^0.4.0",
    "@fortawesome/fontawesome-free": "^5.8.2",
    "@fortawesome/fontawesome-svg-core": "^1.2.18",
    "@fortawesome/free-brands-svg-icons": "^5.8.2",
    "@fortawesome/free-solid-svg-icons": "^5.8.2",
    "@ng-bootstrap/ng-bootstrap": "^5.0.0",
    "@ngrx/effects": "^8.0.0",
    "@ngrx/entity": "^8.0.0",
    "@ngrx/router-store": "^8.0.0",
    "@ngrx/store": "^8.0.0",
    "@ngrx/store-devtools": "^8.0.0",
    "@ngx-translate/core": "^11.0.1",
    "@ngx-translate/http-loader": "^4.0.0",
    "bootstrap": "^4.3.1",
    "browser-detect": "^0.2.28",
    "hammerjs": "^2.0.8",
    "rxjs": "~6.5.0",
    "tslib": "^1.9.0",
    "zone.js": "0.10.1"
  },
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^0.800.6",
    "@angular/cli": "~8.0.0",
    "@angular/compiler-cli": "^8.0.3",
    "@angular/language-service": "~8.0.0",
    "@commitlint/cli": "^7.2.1",
    "@commitlint/config-conventional": "^7.1.2",
    "@types/jasmine": "~2.8.9",
    "@types/jasminewd2": "^2.0.5",
    "@types/node": "^10.14.14",
    "all-contributors-cli": "^5.4.1",
    "codelyzer": "^5.0.0",
    "express": "^4.16.4",
    "husky": "^1.3.1",
    "jasmine-core": "~3.2.1",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~4.1.0",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.4",
    "karma-jasmine": "~2.0.1",
    "karma-jasmine-html-reporter": "^1.4.1",
    "karma-spec-reporter": "^0.0.32",
    "npm-run-all": "^4.1.5",
    "prettier": "^1.17.1",
    "pretty-quick": "^1.11.1",
    "protractor": "~5.4.1",
    "rimraf": "^2.6.2",
    "standard-version": "^6.0.1",
    "ts-node": "~7.0.1",
    "tslint": "~5.15.0",
    "typescript": "~3.4.0",
    "webpack-bundle-analyzer": "^3.3.2"
  }
};


export const environment = {
  appName: '',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
