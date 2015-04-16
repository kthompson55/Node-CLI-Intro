import ArgumentParser from "../src/argument-parsing.js";

let parser = new ArgumentParser();

describe('Yargs Arguments\t',function(){
	describe('Yargs Correct Arguments', function(){
		it('no preid', function(){
			let args = ['-b', 'major'];
			let parsed = parser.parseArgs(args);
			assert(parsed.bump === 'major');
		})
		it('with preid', function(){
			let args = ['-b', 'major', '-p', 'testCase'];
			let parsed = parser.parseArgs(args);
			assert(parsed.bump === 'major');
			assert(parsed.preid === 'testCase');
		})
	})
});
