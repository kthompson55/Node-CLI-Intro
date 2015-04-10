import semver from "semver";

class VersionBumper
{
	versionBump(curVersion,updateType)
	{
		if(semver.valid(curVersion) === null)
		{
		   throw "Invalid version number";
		}
		var increased = semver.inc(curVersion.toLowerCase,updateType);
		console.log(increased);
		return semver.inc(curVersion,updateType);
	}
}

export default VersionBumper;
