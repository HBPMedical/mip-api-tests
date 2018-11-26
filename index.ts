import MIPTests from './src/MIPTests';
import tape from 'tape';
import config from './src/config';
import mocksReviewDecember2018 from './src/mocks-review-december-2018';
import mocksAll from './src/mocks-all';
import mocksReviewMay2018 from './src/mocks-review-may-2018';
import { IModelNames, IExperiment } from './src/types';

const mocks: {
  [index: string]: any;
} = {
  mocksAll,
  mocksReviewDecember2018,
  mocksReviewMay2018,
};
const getMocks = (
  name: string,
): { experiments: IExperiment[]; models: IModelNames } => mocks[name];
const { experiments, models } = getMocks(config.MOCK_FILE);

const argv = process.argv.join(' ');
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
