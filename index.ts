import MIP from './src/MIP';
import { /*experiments, */ models } from './src/mocks';

(async mip => {
  console.log('Generating models & experiments through the HBP MIP api');
  await mip.createModels(models);
  // await mip.runExperiments(experiments, models);
  await mip.testExperimentListResults();
  await mip.testEachExperimentResult();
  console.log('That\'s all folks');
  process.exit(0);
})(new MIP());
