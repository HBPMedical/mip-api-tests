import { ExperimentContainer, ModelContainer } from './containers';
import { experiments, models } from './tests/mocks';
import { IExperimentResult, IModelResult } from './types';

// const experimentsUUID: string[] = [];
// const r = Math.floor(Math.random() * Math.floor(experiments.length));
// const r = experiments.length;
const experimentsToRun = experiments;

export default class {
  public checkExistingModels = async () => {
    const modelContainer = new ModelContainer();
    const fetched = await Promise.all(
      Object.keys(models).map(async key => {
        await modelContainer.load(key);
        return modelContainer.state && modelContainer.state.model;
      }),
    );

    const existing = fetched.every(v => v !== undefined);
    console.log(existing);

    return existing;
  }

  public createModels = async () => {
    const modelContainer = new ModelContainer();
    return await Promise.all(
      Object.keys(models).map(async key => {
        await modelContainer.load(key);
        let result: IModelResult | undefined = modelContainer.state.model;
        if (result === undefined) {
          await modelContainer.create({
            config: {
              hasXAxis: true,
              height: 480,
              title: {
                text: key,
              },
              type: 'designmatrix',
              xAxisVariable: null,
              yAxisVariables: ['apoe4'],
            },
            dataset: {
              code: 'DS1528208604241',
              date: 1533814206000,
              grouping: [],
              header: models[key].coVariables.map((v: any) => v.code),
              variable: models[key].variables.map((v: any) => v.code),
            },
            query: models[key],
          });
          result = modelContainer.state.model;
          console.log('created: ', key);
        } else {
          console.log('existing: ', key);
        }
      }),
    );
  }
  public run = (every: number) => {
    Promise.all(
      experimentsToRun.map(
        (experiment, i) =>
          new Promise((resolve: any) => {
            const run = async () => {
              const experimentContainer = new ExperimentContainer();
              /* tslint:disable */
              const model = Object.keys(models).find(
                (key: string) => models[key] === experiment.model
              );
              /* tslint:enable */
              const exp = {
                algorithms: experiment.methods.map(m => ({
                  code: m.code,
                  name: m.code,
                  parameters: m.parameters,
                  validation: experiment.validations.length ? true : false,
                })),
                model,
                name: experiment.name,
                validations: experiment.validations,
              };
              experimentContainer.create(exp);

              const result:
                | IExperimentResult
                | undefined = await experimentContainer.state.experiment;

              // expect(result!.model).toBeDefined();
              console.log('created', exp.name, result);

              // experimentsUUID.push(result!.uuid);

              resolve();
            };
            setTimeout(run, i * every * 60 * 1000);
          }),
      ),
    );
  }
}
