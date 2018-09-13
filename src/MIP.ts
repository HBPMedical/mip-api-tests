import {
  ExperimentContainer,
  ExperimentListContainer,
  ModelContainer,
} from '../containers';
import { IExperimentResult, IModelResult, INode } from '../types';
import { IExperiment, IModelSamples } from './mocks';
import assert from 'assert';

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
          }

          this.checkForError(modelContainer.state.error);
          if (result) {
            console.log(
              `Model ${result.slug}: ${JSON.stringify(result.query)} `,
            );
          }

          return result;
        }),
      );

      return results.every(v => v !== undefined);
    };

    let modelsCreated: boolean = false;
    do {
      modelsCreated = await create();
    } while (!modelsCreated);

    return Promise.resolve(true);
  }

  public runExperiments = async (
    experiments: IExperiment[],
    models: IModelSamples,
  ): Promise<any> => {
    let experimentCreated: any;
    let experiment = experiments.shift();
    do {
      const model = Object.keys(models).find(
        (key: string) => models[key] === experiment!.model,
      );
      experimentCreated = await this.runAndWaitExperiment(experiment, model);

      if (experimentCreated) {
        experiment = experiments.shift();
      }
    } while (experimentCreated && experiment);

    return Promise.resolve();
  }

  public testEachExperimentResult = async (): Promise<any> => {
    console.log('\n--- Testing Each Experiment Result');
    const experimentListContainer = new ExperimentListContainer();
    await experimentListContainer.load();
    const experiments: IExperimentResult[] | undefined =
      experimentListContainer.state.experiments;

    this.checkForError(experimentListContainer.state.error);

    if (experiments) {
      let experiment = experiments.shift();
      if (experiment) {
        do {
          await experimentContainer.load(experiment.uuid);
          const theExperiment = experimentContainer.state.experiment;
          if (theExperiment) {
            this.testExperiment(theExperiment);
          }
          experiment = experiments.shift();
        } while (experiment);
      }
    }
    // console.log("FAILLLLLLLLLED")
    // return Promise.reject();
  }

  public testExperimentListResults = async () => {
    console.log('\n--- Testing Experiment List Results');
    const experimentListContainer = new ExperimentListContainer();
    await experimentListContainer.load();
    const experiments: IExperimentResult[] | undefined =
      experimentListContainer.state.experiments;

    this.checkForError(experimentListContainer.state.error);
    experiments &&
      experiments.forEach((experiment: IExperimentResult) => {
        this.testExperiment(experiment);
      });
  }

  private testExperiment = (experiment: IExperimentResult): boolean => {
    try {
      assert(experiment.created, `experiment.created`);
      assert(experiment.name, `experiment.created`);
      assert.notEqual(experiment.resultsViewed, `experiment.resultsViewed`);
      assert(experiment.uuid, `experiment.uuid`);
      assert(experiment.modelDefinitionId, `experiment.modelDefinitionId`);
      assert(experiment.user, `experiment.user`);
      assert(experiment.algorithms, `experiment.algorithms`);

      if (experiment.nodes) {
        const nodes: INode[] = experiment.nodes;
        nodes.forEach(node => {
          assert(node.name, `node.name`);
          assert(node.methods, `node.methods`);

          node.methods.forEach(method => {
            assert(method.mime, `method.mime`);
            assert(method.algorithm, `method.algorithm`);
            assert(method.data || method.error, `method.data`);
          });
        });
      }
      console.log(`${experiment.name}, ${experiment.modelDefinitionId}: OK`);

      return true;
    } catch (e) {
      console.log(
        `${experiment.name} ${experiment.modelDefinitionId}: KO`,
        e,
        JSON.stringify(experiment, null, 2),
      );

      return false;
    }
  }

  private checkForError = (error: string | undefined) => {
    if (
      (error && error.match(/ECONNREFUSED/)) ||
      (error && error.match(/Forbidden/))
    ) {
      console.log({ error });
      process.exit(1);
    }
  }

  private runAndWaitExperiment = async (
    experiment: any,
    model: any,
  ): Promise<boolean | any> => {
    return new Promise(async resolve => {
      const exp = {
        algorithms: experiment.methods.map((m: any) => ({
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
      const uuid: string | undefined = created && created.uuid;
      console.log('created', exp.name, uuid);

      this.checkForError(experimentContainer.state.error);

      if (uuid) {
        const timerId = setInterval(async () => {
          const loading = await this.experimentLoadingStatus(uuid);
          console.log({ loading });
          if (!loading) {
            clearInterval(timerId);
            resolve(true);
          }
        },                          10 * 1000);
      }
    });
  }

  private experimentLoadingStatus = async (uuid: string): Promise<boolean> => {
    await experimentContainer.load(uuid);
    const state = experimentContainer.state;
    const experiment: IExperimentResult | undefined = state.experiment;

    const nodes = experiment && experiment.nodes;
    const error = (state && state.error) || (experiment && experiment.error);
    const loading = !nodes && !error;

    return loading;
  }
}
