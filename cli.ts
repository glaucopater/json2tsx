#!/usr/bin/env node
import fs from "fs";
import data from "./options.json";

var versionKeywords = ["-v", "-ver", "--ver", "--version"];
if (process.argv[2] && versionKeywords.includes(process.argv[2])) {
    var _b = require("./package.json"),
        name_1 = _b.name,
        version = _b.version;
    console.log(name_1 + " version: " + version);
} else if (process.argv[2] && fs.existsSync(process.argv[2])) {
    if (!fs.existsSync(data.outputDir)) {
        fs.mkdirSync(data.outputDir);
    }
    var inputFile = process.argv[2];
    //  quicktype .\json_samples\iss-now.json -o output\iss.d.ts --just-types --no-enums
}
