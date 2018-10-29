import MIPTests from './src/MIPTests';
import { experiments, models } from './src/mocks';
import tape from 'tape';
import config from './src/config';

const argv = process.argv.join(' ');
console.log('\narguments: model | update | run | test\n')

tape(`Running tests on ${config.baseUrl}\n`, (t: tape.Test) => {
  (async mip => {
    if (argv.match(/model/)) {
      const createdModels = await Promise.all(
        Object.keys(models).map(key => mip.createModel(key, models[key])),
      );
      t.ok(createdModels.every(x => x), `Models created`);
    }

    if (argv.match(/update/)) {
      const updatedModels = await Promise.all(
        Object.keys(models).map(key => mip.updateModel(key, models[key])),
      );
      t.ok(updatedModels.every(x => x), `Models updated`);
    }

    if (argv.match(/run/)) {
      await mip.runExperiments(t, experiments, models);
    }

    if (argv.match(/test/)) {
      await mip.testEachExperimentResult(t, 2);
    }

    console.log('\n\nThat\'s all folks');

    t.end();
  })(new MIPTests());
});
