const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  viewportHeight: 800,
  viewportWidth: 800,
  videoCompression: false,
  e2e: {
    baseUrl: "https://sso.foxstone.ch/en/forgot-pass",
    setupNodeEvents(on, config) {},
  },
  env: {
    MAILOSAUR_API_KEY: "goiyBDhNm4cXDTGQ",
  },
});
