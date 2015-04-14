import VersionBumper from "./version-bump.js";
import Yargs from "Yargs";
import Package from "../package.json";

let yarguments = Yargs
	.usage('Usage: release <version-type> --preid <id>')
	.help('Version Types are:\nmajor\tminor\tpatch\n\t\tpremajor\tpreminor\tprepatch\n\nPre-ids shoudld be one word. Any pre-id that is multiple words will be concatentated into one (e.g. "this that" becomes "thisthat"')
	.alias('h','help')
	.command('version','Get version number')
	.alias('v','version')
	.command('preid','Set prerelease tag')
	.alias('p','preid');

if(yarguments.argv.help)
{
	yarguments.showHelp();
}
else if(yarguments.argv.version)
{
	console.log(Package.version);
}
else
{
	if(yarguments.argv.preid)
	{
		let preid = '';
		let args  = yarguments.argv.preid.split(' ');
		args.forEach(function(word){preid += word.toLowerCase();});
		console.log(preid);
	}
}
