import semver from "semver";

class VersionBumper
{
	versionBump(curVersion,updateType)
	{
		
		if(!semver.isValid(curVersion)){
		   throw "Invalid version number";
		   }
		return semver.increment(updateType,curVersion);
	}
}

export default VersionBumper;
