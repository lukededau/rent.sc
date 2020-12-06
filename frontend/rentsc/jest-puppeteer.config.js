module.exports = {
    launch: {
      headless: false
    },
    server: {
      command: "npm start",
      port: 3000,
      usedPortAction: "kill",
      launchTimeout: 60000,
      debug: true,
    },
    browser: "chromium",
};