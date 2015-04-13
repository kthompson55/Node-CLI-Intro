import Semver from "Semver";

class VersionBumper
{
	verifyValidType(type){
		return type === "major"
		|| type === "minor"
		|| type === "patch"
		|| type === "pre";
	}
	
	versionBump(curVersion,updateType){
		if(this.verifyValidType(updateType))
		{
			if(Semver.valid(curVersion) != null)
			{
				return Semver.inc(Semver.valid(curVersion),updateType.toLowerCase());
			}
			else throw "Invalid version number";
		}
		else throw "Invalid update type";
	}
}

export default VersionBumper;
