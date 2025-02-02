// jest.config.js
module.exports = {
  testTimeout: 2500000,
  "moduleDirectories": [
      "node_modules",
      "src"
    ],
  "collectCoverageFrom": [
      "src/**/*.js",
      "route.js",
      "route_functions.js",
      "!src/App.js",
      "!src/index.js"
    ]
};