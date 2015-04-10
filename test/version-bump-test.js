import VersionBumper from "../lib/version-bump.js";
var test = new VersionBumper();
var currentVersion = '1.0.0';
var newVersion = '';

describe("version bumper", function() {
	describe('version should be higher\n\t', function(){
		it('major release',function(){
			try{
				newVersion = test.versionBump(currentVersion,"major");
				assert(semver.satisfies(newVersion > currentVersion));
			}
			catch(err){
				console.log("MAJOR EXCEPTION: " + err);
				assert(false);
			}
		})
		it('minor release',function(){
			try{
				newVersion = test.versionBump(currentVersion,"minor");
				console.log("Filler");
			}
			catch(err){
				assert(false);
			}
		})
		it('patch release',function(){
			try{
				newVersion = test.versionBump(currentVersion,"patch");
				console.log("Filler");
			}
			catch(err){
				assert(false);
			}
		})
		it('pre release',function(){
			try{
				newVersion = test.versionBump(currentVersion,"pre");
				console.log("Filler");
			}
			catch(err){
				assert(false);
			}
		})
	})
	describe('exception will be thrown', function(){
		it('invalid current version', function(){
			try{
				console.log("Filler");
			}
			catch(err){
				assert(false);
			}
		})
		it('invalid update type', function(){
			try{
				console.log("Filler");
			}
			catch(err){
				assert(false);
			}
		})
	})
})
