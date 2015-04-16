import VersionBumper from "../src/version-bump.js";
import Semver from "Semver";

let test = new VersionBumper();

let currentVersion = '1.0.0';
let newVersion = '';

describe("Version Bumper\t", function() {
	describe('version should be higher', function(){
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
			try{
				newVersion = Semver.valid(test.versionBump(currentVersion,"pre","alpha"));
				assert(fail);
			}catch(err){
				console.log(err);
				assert(err === "Cannot go back to previous preID");
			}
		})
	})
	describe('pre-version bumping with previous predID',function(){
		it('same id',function(){
			let idVersion = "1.0.0-alpha.0";
			newVersion = Semver.valid(test.versionBump(idVersion,"pre","alpha"));
			let increasedVersionTest = Semver.gt(newVersion,idVersion);
			assert(increasedVersionTest);
		})
		it('different ids, old id is earlier',function(){
			let idVersion = "1.0.0-alpha.0";
			newVersion = Semver.valid(test.versionBump(idVersion,"pre","beta"));
			let increasedVersionTest = Semver.gt(newVersion,idVersion);
			assert(increasedVersionTest);
		})
		it('different ids, old id is later',function(){
			try{
				let idVersion = "1.0.0-beta.0";
				newVersion = Semver.valid(test.versionBump(idVersion,"pre","alpha"));
				assert(fail);
			}catch(err){
				assert(err === "Cannot go back to previous preID");
			}
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
