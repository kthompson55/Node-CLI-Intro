import VersionBumper from './version-bump.js';
import Package from '../package.json';
import Promise from 'fs-promise';
import Path from 'path';

class PackageHandler
{	
	getVersion(){
		return Package.version;
	}
	
	updateJson(updateType,preid){
		let bumper = new VersionBumper();
		try{
			let newVersion = bumper.versionBump(Package.version,updateType,preid);
			Package.version = newVersion;
			return Promise.writeFile('../pacakage.json',JSON.stringify(Package,null,'  '));
		}catch(err){
			console.log("FAIL");
			console.log(`The following error occurred: ${err}`);
			return false;
		}
	}
}

export default PackageHandler;
