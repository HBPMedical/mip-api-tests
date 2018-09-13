import MIP from './src/MIP';
// import { experiments, models } from './src/mocks';

import tape from 'tape';

tape('Tests up and running', function (t: tape.Test) {
  // t.plan(1);

  (async mip => {
    // console.log('Generating models & experiments through the HBP MIP api');
    // await mip.createModels(models);
    // await mip.runExperiments(experiments, models);
    t.ok(await mip.testExperimentListResults(t), 'testExperimentListResults');
    // await mip.testEachExperimentResult();
    // console.log('\n\nThat\'s all folks');
    // process.exit(0);
    t.end();
  })(new MIP());
});
