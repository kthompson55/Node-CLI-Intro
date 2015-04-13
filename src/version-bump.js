import Semver from "Semver";

class VersionBumper
{
	versionBump(curVersion,updateType)
	{
		if(Semver.valid(curVersion) != null)
		{
			return Semver.inc(Semver.valid(curVersion),updateType.toLowerCase());
		}
		else throw "Invalid version";
	}
}

export default VersionBumper;
