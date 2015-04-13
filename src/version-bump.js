import Semver from "Semver";

class VersionBumper
{
	verifyValidType(type){
		return type === "major"
		|| type === "minor"
		|| type === "patch"
		|| type === "pre"
		|| type === "premajor"
		|| type === "preminor"
		|| type === "prepatch";
	}
	
	versionBump(curVersion,updateType,preID){
		if(this.verifyValidType(updateType))
		{
			if(Semver.valid(curVersion) !== null)
			{
				let potentialNewVersion = Semver.inc(curVersion,updateType.toLowerCase(),preID);
				if(Semver.gt(potentialNewVersion,curVersion))
				{
					return potentialNewVersion;	
				}
				else throw "Cannot go back to previous preID";
			}
			else throw "Invalid version number";
		}
		else throw "Invalid update type";
	}
}

export default VersionBumper;
