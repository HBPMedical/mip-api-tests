import MIP from './MIP';

(async mip => {
  let modelsCreated: boolean = false;
  do {
    modelsCreated = await mip.createModels();
  } while (!modelsCreated);

  await mip.run(3);
})(new MIP());
