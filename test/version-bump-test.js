import VersionBumper from "../src/version-bump.js";
import Semver from "Semver";

let test = new VersionBumper();

let currentVersion = '1.0.0';
let newVersion = '';

describe("version bumper", function() {
	describe('version should be higher\n\t', function(){
		it('major release',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"major"));
			let increasedVersionTest = Semver.gt(newVersion,currentVersion);
			let majorIncrementTest = compareVersionType("major",currentVersion,newVersion);
			assert(increasedVersionTest && majorIncrementTest);
		})
		it('minor release',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"minor"));
			let increasedVersionTest = Semver.gt(newVersion,currentVersion);
			let minorIncremementTest = compareVersionType("minor",currentVersion,newVersion);
			assert(increasedVersionTest && minorIncremementTest);
		})
		it('patch release',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"patch"));
			let increasedVersionTest = Semver.gt(newVersion,currentVersion);
			let patchIncrementTest = compareVersionType("patch",currentVersion,newVersion);
			assert(increasedVersionTest && patchIncrementTest);
		})
	})
	describe('pre-version bumping with no previous preID',function(){
		it('pre-major',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"premajor","alpha"));
			let increasedVersionTest = Semver.gt(newVersion,currentVersion);
			let majorIncrementTest = compareVersionType("major",currentVersion,newVersion);
			assert(majorIncrementTest && increasedVersionTest);
		})
		it('pre-minor',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"preminor","alpha"));
			let increasedVersionTest = Semver.gt(newVersion,currentVersion);
			let minorIncrementTest = compareVersionType("minor",currentVersion,newVersion);
			assert(minorIncrementTest && increasedVersionTest);
		})
		it('pre-patch',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"prepatch","alpha"));
			let increasedVersionTest = Semver.gt(newVersion,currentVersion);
			let patchIncrementTest = compareVersionType("patch",currentVersion,newVersion);
			assert(patchIncrementTest,increasedVersionTest);
		})
		it('pre',function(){
			newVersion = Semver.valid(test.versionBump(currentVersion,"pre","alpha"));
			let decreasedVersionTest = Semver.lt(newVersion,currentVersion);
			assert(decreasedVersionTest);
		})
	})
	describe('pre-version bumping with previous predID',function(){
		it('same id',function(){
		})
		xit('different id',function(){
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
