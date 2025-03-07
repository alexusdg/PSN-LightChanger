// jest.config.js
module.exports = {
  testTimeout: 2500000,
  setupFiles: ["src/jest.setup.js"],
  moduleDirectories: ["node_modules", "src"],
  collectCoverageFrom: [
    "src/**/*.js",
    "route.js",
    "route_functions.js",
    "!src/App.js",
    "!src/index.js",
  ],
}
