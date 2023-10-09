const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        // define the tasks here
      });
    },
    baseUrl: "http://localhost:3000",
  },
});
