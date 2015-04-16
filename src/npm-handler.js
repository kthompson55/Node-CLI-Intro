import ChildPromise from 'child-process-promise';

class NPMHandler
{
	publishToNPM()
	{
		let promise = ChildPromise.exec;
		promise('echo npm publish');
	}
}

export default NPMHandler;
