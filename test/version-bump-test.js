import VersionBumper from "../src/version-bump.js";
import Semver from "Semver";

let test = new VersionBumper();

let currentVersion = '1.0.0';
let newVersion = '';

describe("version bumper", function() {
	describe('version should be higher\n\t', function(){
		it('major release',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"major"));
			let increasedVersion = Semver.satisfies(newVersion, '>' + currentVersion);
			let majorIncrementTest = compareVersionType("major",currentVersion,newVersion);
			
			assert(increasedVersion && majorIncrementTest);
		})
		it('minor release',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"minor"));
			let increasedVersion = Semver.satisfies(newVersion, '>' + currentVersion);
			let minorIncremementTest = compareVersionType("minor",currentVersion,newVersion);
			assert(increasedVersion && minorIncremementTest);
		})
		it('patch release',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"patch"));
			let increasedVersion = Semver.satisfies(newVersion, '>' + currentVersion);
			let patchIncrementTest = compareVersionType("patch",currentVersion,newVersion);
			assert(increasedVersion && patchIncrementTest);
		})
	})
	describe('pre version bumping',function(){
		xit('pre-major',function(){
		})
		xit('pre-minor',function(){
		})
		xit('pre-patch',function(){
		})
	})
	describe('exception will be thrown', function(){
		it('invalid current version', function(){
			try{
				let brokenVersion = 'a.b.c';
				let result = test.versionBump(brokenVersion,"major");
				assert(false);
			}catch(err){
				assert(err === "Invalid version number");
			}
		})
		it('invalid update type', function(){
			try{
				let result = test.versionBump(currentVersion,"invalid");
				assert(false);
			}catch(err){
				assert(err === "Invalid update type");
			}
		})
	})
})

function compareVersionType(type, oldVersion, newVersion)
{
	if(type.toLowerCase() === ("major"))
	{
		return Semver.major(newVersion) > Semver.major(oldVersion);
	}
	else if(type.toLowerCase() === ("minor"))
	{
		return Semver.minor(newVersion) > Semver.minor(oldVersion);
	}
	else if(type.toLowerCase() === ("patch"))
	{
		return Semver.patch(newVersion) > Semver.patch(oldVersion);
	}
	else if(type.toLowerCase() === ("pre"))
	{
		return Semver.valid(newVersion) > Semver.valid(oldVersion);
	}
	return false;
}
