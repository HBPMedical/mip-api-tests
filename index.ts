import MIP from './MIP';

(async mip => {
  let modelsCreated: boolean = false;
  do {
    modelsCreated = await mip.createModels();
  } while (!modelsCreated);

  await mip.runAll();
  console.log("That's all folks")
})(new MIP());
