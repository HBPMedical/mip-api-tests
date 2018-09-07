import { ExperimentContainer, ModelContainer } from './containers';
import { experiments, models } from './tests/mocks';
import { IExperimentResult, IModelResult } from './types';

const experimentsToRun = experiments;

export default class {
  public createModels = async (): Promise<boolean> => {
    const modelContainer = new ModelContainer();
    const results = await Promise.all(
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

        return result;
      }),
    );

    return results.every(v => v !== undefined);
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
              await experimentContainer.create(exp);

              const created: IExperimentResult | undefined =
                experimentContainer.state.experiment;
              const uuid = created && created.uuid;
              console.log('created', exp.name, uuid);

              if (uuid) {
                const loadExperiment = async () => {
                  await experimentContainer.load(uuid);
                  const state = experimentContainer.state;
                  const experiment: IExperimentResult | undefined =
                    state.experiment;

                  const nodes = experiment && experiment.nodes;
                  const error =
                    (state && state.error) || (experiment && experiment.error);
                  const loading = !nodes && !error;

                  return loading;
                };

                
                const timerId = setInterval(async () => {
                  const loading = await loadExperiment()
                  console.log({ loading })
                  if (!loading) {
                    clearInterval(timerId);
                  }
                }, 10 * 1000);
                
              }
              resolve();
            };
            setTimeout(run, i * every * 60 * 1000);
          }),
      ),
    );
  }
}
