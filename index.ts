import MIPTests from './src/MIPTests';
import tape from 'tape';
import config from './src/config';

const argv = process.argv.join(' ');
const { experiments, models } = config;

console.log('\narguments: model | run | test\n');

tape(`Running tests on ${config.baseUrl}\n`, (t: tape.Test) => {
  (async mip => {
    if (argv.match(/model/)) {
      const createdModels = await Promise.all(
        Object.keys(models).map(key => mip.createModel(key, models[key])),
      );
      t.ok(createdModels.every(x => x), `Models created`);
    }

    if (argv.match(/run/)) {
      await mip.runExperiments(t, experiments, models);
    }

    if (argv.match(/test/)) {
      await mip.testEachExperimentResult(t, 1.5);
    }

    console.log('\n\nThat\'s all folks');

    t.end();
  })(new MIPTests());
});
