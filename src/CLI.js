// project files
import VersionBumper from "./version-bump.js";
import Package from "../package.json";

// JSON writing
import Yargs from "Yargs";
import Promise from "fs-promise";
import Path from 'path';

// Git pushing
import ChildPromise from 'child-process-promise';

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
	if(updateJson())
	{
		if(updateGit())
		{
			console.log("API Stuff");
			gitAPI();
		}
	}	
}

// START JSON HANDLING_
function updateJson()
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
		Promise.writeFile(file('../package.json'),JSON.stringify(Package,null,'  '));
		return true;
	}catch(err){
		console.log("The following error occurred: " + err);
		return false;
	}
}

function file(){
  	var args = [].slice.call(arguments);
	args.unshift('bin');
  	return Path.join.apply(Path, args);
}
// _END JSON
// START GIT_
function updateGit()
{
	let promise = ChildPromise.exec;
	promise('git add package.json')
		.then(
			promise('git commit -m "release ' + Package.version + '"')
			.then(
				promise('git tag v' + Package.version)
				.then(
					promise('git push --tags')
					.then(function(){
						return true;
					})
				)
			)
		);
}

function gitAPI()
{
	console.log("API Stuff");
	let promise = ChildPromise.exec;
	promise('git GET /repos/kthompson55/Node-CLI-Intro/releases/tag/v.1.0.0')
	.then('echo get received')
	.fail(function(){console.log('GET repo details failed'); return false;});
}
//_END GIT
