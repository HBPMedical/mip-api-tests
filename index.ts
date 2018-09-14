import MIPTest from './src/MIPTests';
import { experiments, models } from './src/mocks'; //FIXME: pure functions

import tape from 'tape';

tape('Tests up and running', function (t: tape.Test) {
  // t.plan(1);

  (async mip => {
    // console.log('Generating models & experiments through the HBP MIP api');
    // await mip.createModels(models);
    await mip.runExperiments(t, experiments, models);
    t.ok(await mip.testExperimentListResults(t), 'testExperimentListResults');
    t.ok(await mip.testEachExperimentResult(t), 'testEachExperimentResult');
    console.log('\n\nThat\'s all folks');
    t.end();
  })(new MIPTest());
});
