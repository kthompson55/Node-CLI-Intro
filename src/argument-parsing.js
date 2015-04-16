import Yargs from "Yargs";

export function parseArgs(args)
{
	Yargs.reset();
	let yarguments = Yargs
		.usage('Usage: -b [string] -p [string]')
		.example('Example: -b major -p tag')
		.help('Version Types are:\nmajor\tminor\tpatch\n\t\tpremajor\tpreminor\tprepatch\n\nPre-ids shoudld be one word')
		.alias('h','help')
		.command('version','Get current version')
		.alias('v','version')
		.command('bump','Bump version, followed by update type')
		.alias('b','bump')
		.command('preid','Set prerelease tag')
		.alias('p','preid')
		.implies('preid','bump');
	
	return yarguments.parse(args);
}
