#!/usr/bin/env node
"use strict";

const fs = require("fs-extra");
const path = require("path");
const pkg = require("../package.json");

const fileName = path.join(__dirname, "..", pkg.main);

// Perfectionist adds comments to the end of the previous line...
// }/* comment */ => }\n\n  /* comment */
function adjustComments(css) {
  return css.replace(/}\/\*(([\s\S])+?)\*\/\s*/g, "}\n\n  /*$1*/\n  ");
}

async function postPerfectionist() {
  const css = await fs.readFile(fileName, "utf8");
  await fs.writeFile(fileName, adjustComments(css));
  console.log("\x1b[32m%s\x1b[0m", `${pkg.title} usercss cleanup completed`);
}

postPerfectionist();
