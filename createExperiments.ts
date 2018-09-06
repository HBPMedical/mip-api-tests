import { ExperimentContainer } from './containers'
import { experiments, models } from "./tests/mocks";
import { IExperimentResult } from './types'

var Promise = require('promise');
const experimentsUUID: string[] = [];
const r = Math.floor(Math.random() * Math.floor(experiments.length));
// const r = experiments.length;
const experimentsToRun = experiments.slice(r, r + 2);

export default () =>
  Promise.all(
    experimentsToRun.map(
      (experiment, i) =>
        new Promise((resolve: any) => {
          const run = () => {
            console.log('THEN');
            const experimentContainer = new ExperimentContainer();
            /* tslint:disable */
            const model = Object.keys(models).find(
              (key: string) => (models[key]) === experiment.model,
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

            const result: IExperimentResult | undefined =
              experimentContainer.state.experiment;

            // expect(result!.model).toBeDefined();
            console.log('created', exp.name);

            experimentsUUID.push(result!.uuid);

            resolve();
          };
          setTimeout(run, 3);
        }),
    ),
  );
