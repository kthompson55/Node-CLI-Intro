import VersionBumper from "./version-bump.js";
import Yargs from "Yargs";
import Package from "../package.json";
import Promise from "fs-promise";
import Path from 'path';

let bumper = new VersionBumper();

let yarguments = Yargs
	.usage('Usage: -b [string] -p [string]')
	.example('Example: -b major -p tag')
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
		Package.version = updateVersion;
		Promise.writeFile(file('../package.json'),JSON.stringify(Package));
	}catch(err){
		console.log("The following error occurred: " + err);
	}
}

function file(){
  	var args = [].slice.call(arguments);
	args.unshift('bin');
  	return Path.join.apply(Path, args);
}
