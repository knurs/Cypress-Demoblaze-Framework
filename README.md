# Cypress Cucumber TypeScript Framework
* THIS IS A DEMO CYPRESS AUTOMATION FRAMEWORK

* This Automation framework has been build on Cypress-Cucumber-Typescript.

* Regarding E2E Tests,  Black-box Test Technique has been implemented.

* POM (Page object Model) is the technique to create a separate page for each and every web pages
and inserting all the web element into respective page models.

* After importing related pages into test script, an instance (object) of a page is created in the test scripts.

* Inside the cucumber framework all Feature files are created with Gherking language (Given/When/Then)

* To execute the Automated E2E Test in local machine on Terminal, follow the steps below;
  - Type ==> npm install
  - Then type ==> npm run open 
    > This will initiate Cypress Runner window
    > Select E2E Testing > Configured
    > Choose a browser and click on Start E2E Testing in Chrome
    > Select the testcases you wish to run 
## Features
- Cypress v14+ with Cucumber (BDD)
- UI and API Testing Support
- Page Object Model
- TypeScript Support
- HTML Reporting via Mochawesome

## How to Use

```bash
npm install
npx cypress open
```

## Generate Report

```bash
npx cypress run
```

Report will be available in `/cypress/reports/html`
