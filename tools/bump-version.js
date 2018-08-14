#!/usr/bin/env node
"use strict";

const fs = require("fs-extra");
const path = require("path");
const semver = require("semver");

const version = require("../package.json").version;

const file = path.join(__dirname, "..", "quora-dark.user.css");

(async () => {
  // level = patch, minor or major
  const level = process.argv.pop();
  const newVersion = semver.inc(version, level);

  fs.readFile(file, "utf8")
    .then(css => css.replace(`v${version}`, `v${newVersion}`))
    .then(css => fs.writeFile(file, css))
    .then(() => console.log("\x1b[32m%s\x1b[0m", "Quora Dark usercss updated"))
    .catch(exit);
})();

function exit(err) {
  if (err) {
    console.error(err);
  }
  process.exit(err ? 1 : 0);
}