import {parseArgs} from "../src/argument-parsing.js";

describe('Yargs Arguments\n\t',function(){
	describe('Yargs Correct Arguments', function(){
		it('no preid', function(){
			let args = ['-b', 'major'];
			let parsed = parseArgs(args);
			assert(parsed.bump === 'major');
		})
		it('with preid', function(){
			let args = ['-b', 'major', '-p', 'testCase'];
			let parsed = parseArgs(args);
			assert(parsed.bump === 'major');
			assert(parsed.preid === 'testCase');
		})
	})
});
