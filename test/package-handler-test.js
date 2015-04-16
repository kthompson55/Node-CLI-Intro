import PackageHandler from '../src/package-handler.js';
import Package from '../package.json';
import Semver from 'Semver';

let handler = new PackageHandler();

describe('Package Handler Tests\t',function(){
	it('get current package number',function(){
		let packageVersion = Package.version;
		let handlerVersion = handler.getVersion();
		assert(packageVersion === handlerVersion);
	})
	it('update package', function(){
		let oldVersion = handler.getVersion();
		let newVersion = handler.updateJson('minor')
			.then(assert(Semver.gt(handler.getVersion(),oldVersion)));
	})
});
