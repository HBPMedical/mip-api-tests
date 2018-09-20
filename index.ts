import MIPTests from './src/MIPTests';
import { experiments, models } from './src/mocks';
import tape from 'tape';

const argv = process.argv;
const hasCreateModel = argv.join(' ').match(/model/)
const hasRunExperiment = argv.join(' ').match(/run/)

tape('Tests up and running', (t: tape.Test) => {
  (async mip => {
    if (hasCreateModel) {
      await mip.createModels(models);
      process.exit(0) // FIXME: be sure model are created
    }
    if (hasRunExperiment) {
      await mip.runExperiments(t, experiments, models);
    }
    // await mip.testExperimentListResults(t);
    await mip.testEachExperimentResult(t, 2);
    console.log('\n\nThat\'s all folks');
    t.end();
  })(new MIPTests());
});
