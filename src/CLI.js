import VersionBumper from "./version-bump.js";
import Yargs from "Yargs";

let yarguments = Yargs
	.usage('Usage: release <version-type> --preid <id>')
	.help('Version Types are:\nmajor\tminor\tpatch\n\t\tpremajor\tpreminor\tprepatch\n')
	.alias('h','help');

if(yarguments.argv.help)
{
	yarguments.showHelp();
}
