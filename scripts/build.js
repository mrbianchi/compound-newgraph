#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const { execSync } = require("child_process");

const options = yargs
  .usage("Usage: yarn build network <name>")
  .option("network", { describe: "Network name", type: "string", demandOption: true }).argv;

function generateNetworkAddressesFile() {
  try {
    const networksFile = fs.readFileSync(path.join(__dirname, "..", "networks.json"));
    const networksFileParsed = JSON.parse(networksFile);
    const networkAddresses = networksFileParsed[options.network];

    const addresses = Object.keys(networkAddresses).reduce((prev, key) => {
      prev += `export const ${key}Address = "${networkAddresses[key].address.toLowerCase()}";\n`;
      return prev;
    }, "");

    fs.writeFileSync(path.join(__dirname, "..", "src", "constants", "networkAddresses.ts"), addresses);
  } catch (error) {
    console.log(error);
    exit(1);
  }
}

generateNetworkAddressesFile();
execSync(`graph build --network ${options.network}`);
