//console.log("Hello, " + process.argv[2]);

import VersionBumper from "./version-bump.js";
var bumper = new VersionBumper();
bumper.versionBump(process.argv[2]);
