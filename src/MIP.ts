import { ExperimentContainer, ModelContainer } from "../containers";
import { IExperimentResult, IModelResult } from "../types";
import { IExperiment, IModelSamples } from "./mocks";

const experimentContainer = new ExperimentContainer();

export default class {
  public createModels = async (models: IModelSamples): Promise<boolean> => {
    const create = async () => {
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
                  text: key
                },
                type: "designmatrix",
                xAxisVariable: null,
                yAxisVariables: ["apoe4"]
              },
              dataset: {
                code: "DS1528208604241",
                date: 1533814206000,
                grouping: [],
                header: models[key].coVariables.map((v: any) => v.code),
                variable: models[key].variables.map((v: any) => v.code)
              },
              query: models[key]
            });
            result = modelContainer.state.model;
          }

          const error: string | undefined = modelContainer.state.error;
          if (error && error.match(/ECONNREFUSED/)) {
            console.log({ error });
            process.exit(1);
          }

          console.log({ result });

          return result;
        })
      );

      return results.every(v => v !== undefined);
    };

    let modelsCreated: boolean = false;
    do {
      modelsCreated = await create();
    } while (!modelsCreated);

    return Promise.resolve(true);
  };

  public runExperiments = async (
    experiments: IExperiment[],
    models: IModelSamples
  ): Promise<any> => {
    let experimentCreated: any;
    let experiment = experiments.shift();
    do {
      const model = Object.keys(models).find(
        (key: string) => models[key] === experiment!.model
      );
      experimentCreated = await this.runAndWaitExperiment(experiment, model);

      if (experimentCreated) {
        experiment = experiments.shift();
      }
    } while (experimentCreated && experiment);

    return Promise.resolve();
  };

  private runAndWaitExperiment = async (
    experiment: any,
    model: any
  ): Promise<boolean | any> => {
    return new Promise(async resolve => {
      const exp = {
        algorithms: experiment.methods.map((m: any) => ({
          code: m.code,
          name: m.code,
          parameters: m.parameters,
          validation: experiment.validations.length ? true : false
        })),
        model,
        name: experiment.name,
        validations: experiment.validations
      };
      await experimentContainer.create(exp);

      const created: IExperimentResult | undefined =
        experimentContainer.state.experiment;
      const uuid: string | undefined = created && created.uuid;
      console.log("created", exp.name, uuid);

      const error: string | undefined = experimentContainer.state.error;
      if (error && error.match(/ECONNREFUSED/)) {
        console.log({ error });
        process.exit(1);
      }

      if (uuid) {
        const timerId = setInterval(async () => {
          const loading = await this.experimentLoadingStatus(uuid);
          console.log({ loading });
          if (!loading) {
            clearInterval(timerId);
            resolve(true);
          }
        }, 10 * 1000);
      }
    });
  };

  private experimentLoadingStatus = async (uuid: string): Promise<boolean> => {
    await experimentContainer.load(uuid);
    const state = experimentContainer.state;
    const experiment: IExperimentResult | undefined = state.experiment;

    const nodes = experiment && experiment.nodes;
    const error = (state && state.error) || (experiment && experiment.error);
    const loading = !nodes && !error;

    return loading;
  };
}
