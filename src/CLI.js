import VersionBumper from "./version-bump.js";
import Yargs from "Yargs";
import Package from "../package.json";

let bumper = new VersionBumper();

let yarguments = Yargs
	.usage('Usage: bin/release <version-type> --preid <id>')
	.help('Version Types are:\nmajor\tminor\tpatch\n\t\tpremajor\tpreminor\tprepatch\n\nPre-ids shoudld be one word. Any pre-id that is multiple words will be concatentated into one (e.g. "this that" becomes "thisthat"\n')
	.alias('h','help')
	.command('version','Get current version')
	.alias('v','version')
	.command('bump','Bump version, followed by update type')
	.alias('b','bump')
	.command('preid','Set prerelease tag')
	.alias('p','preid')
	.implies('preid','updateType');

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
	console.log("Previous version: " + Package.version);
	let preid;
	if(yarguments.argv.preid)
	{
		let args  = yarguments.argv.preid.split(' ');
		args.forEach(function(word){preid += word.toLowerCase();});
		console.log(preid);
	}
	let updateType = yarguments.argv.bump;
	try{
		let updateVersion = bumper.versionBump(Package.version,updateType,preid);
		console.log("Current version: " + updateVersion);
	}catch(err){
		console.log("The following error occurred: " + err);
	}
}
