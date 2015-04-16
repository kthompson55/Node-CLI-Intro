import ChildPromise from 'child-process-promise';
import Curl from 'curl';

class GitHandler
{
	updateGit()
	{
		let promise = ChildPromise.exec;
		return promise(`git add package.json`)
			.then(promise(`git commit -m "release v${Package.version}"`))
			.then(promise(`git tag v${Package.version}`))
			.then(promise('git push --tags'));
	}
	
	gitAPI()
	{
		let gitValues = {
			tag_name: 'v' + Package.version,
			name: 'v' + Package.version,
			owner: Package.owner,
			repo: Package.repository.url
		};
	}
}

export default GitHandler;
