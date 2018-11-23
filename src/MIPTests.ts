import ExperimentContainer from '@app/components/API/Experiment';
import ModelContainer from '@app/components/API/Model';

import {
  IExperimentResult,
  IModelResult,
  INode,
} from '@app/types';
import { IExperiment, IModel, IModels } from './mocks';
import { MIME_TYPES } from '@app/constants';
import tape from 'tape';
import config from './config';

const modelTemplate = (slug: string, model: IModel) => ({
  title: slug,
  valid: true,
  createdAt: 1540561037000,
  query: model,
  dataset: {
    code: 'DS1540825503020',
  },
  config: {
    title: { text: slug },
  },
  createdBy: {
    username: 'anonymous',
  },
});


const experimentContainer = new ExperimentContainer(config);
enum sourceType {
  list,
  item,
}

export default class {
  public methodEachErrorCount: number; // FIXME: pure functions
  public methodEachCount: number;
  public methodListErrorCount: number;
  public methodListCount: number;

  constructor() {
    this.methodEachErrorCount = 0;
    this.methodEachCount = 0;
    this.methodListErrorCount = 0;
    this.methodListCount = 0;
  }

  public createModel = async (key: string, model: IModel): Promise<boolean> => {
    const create = async () => {
      const modelContainer = new ModelContainer(config);
      await modelContainer.one(key);
      let result: IModelResult | undefined = modelContainer.state.model;
      if (result === undefined) {
        console.log(`Create ${key}`);
        await modelContainer.create(modelTemplate(key, model));
        result = modelContainer.state.model;
      } else {
        console.log(`Existing: ${key}`);
      }

      this.hasNetworkError(modelContainer.state.error);

      return result ? true : false;
    };

    let modelsCreated: boolean = false;
    do {
      modelsCreated = await create();
    } while (!modelsCreated);

    return Promise.resolve(true);
  }

  public runExperiments = async (
    t: tape.Test,
    iexperiments: IExperiment[],
    models: IModels,
  ): Promise<any> => {
    let experimentCreated: any;
    const experiments = [...iexperiments];
    let experiment = experiments.shift();
    do {
      const slug = Object.keys(models).find(
        (key: string) => models[key] === experiment!.model,
      );

      const updatedModel = await this.updateModel(slug!, models[slug!]);
      console.log({ updatedModel });
      if (!updatedModel) {
        console.log('Model was not updated');

        return;
      }

      experimentCreated = await this.runAndWaitExperiment(experiment, slug);

      if (experimentCreated) {
        this.testExperiment(experimentCreated.experiment, sourceType.item, t);
        experiment = experiments.shift();
      }
    } while (experimentCreated && experiment);

    return Promise.resolve();
  }

  public testEachExperimentResult = async (
    t: tape.Test,
    fromHourAgo: number = Number.MAX_SAFE_INTEGER,
  ): Promise<any> => {
    console.log('\n--- Testing Each Experiment Result');
    const experimentListContainer = new ExperimentContainer(config);
    await experimentListContainer.all();
    const experiments: IExperimentResult[] | undefined =
      experimentListContainer.state.experiments;

    this.hasNetworkError(experimentListContainer.state.error);

    if (experiments) {
      const experimentsCount = experiments.length;
      let experiment = experiments.shift(); // FIXME: should be unmutable
      if (experiment) {
        do {
          await experimentContainer.one(experiment.uuid);
          const theExperiment = experimentContainer.state.experiment;
          if (theExperiment) {
            this.testExperiment(theExperiment, sourceType.item, t, fromHourAgo);
          }
          experiment = experiments.shift();
        } while (experiment);

        console.log('\n\n');
        t.comment(
          `\n----------------------------------------------------------------\n${
            this.methodEachErrorCount
          } methods on ${
            this.methodEachCount
          } had errors on ${experimentsCount} experiments\n------------------------------------------------------------\n`,
        );

        return true;
      }
    }
  }

  public testExperimentListResults = async (t: tape.Test) => {
    console.log('\n--- Testing Experiment List Results');
    const experimentListContainer = new ExperimentContainer(config);
    await experimentListContainer.all();
    const experiments: IExperimentResult[] | undefined =
      experimentListContainer.state.experiments;

    t.error(
      this.hasNetworkError(experimentListContainer.state.error),
      'No network error',
    );

    t.ok(experiments, 'Experiments response from server');

    if (experiments) {
      const result = Promise.all(
        experiments.map((experiment: IExperimentResult) =>
          this.testExperiment(experiment, sourceType.list, t),
        ),
      );
      console.log('\n\n');
      t.comment(
        `\n------------------------------------------------------------\n ${
          this.methodListErrorCount
        } methods on ${this.methodListCount} had errors on ${
          experiments.length
        } experiments \n------------------------------------------------------------\n`,
      );

      return result;
    }

    return false;
  }

  public updateModel = async (slug: string, model: any) => {
    const modelContainer = new ModelContainer(config);
    const newModel = { ...modelTemplate(slug, model), slug };
    await modelContainer.update(newModel);
    if (!modelContainer.state.model) {
      console.log(`Model: ${slug} error ${modelContainer.state.error}`);
      return Promise.resolve(false);
    }

    console.log(`${slug} updated`);
    return Promise.resolve(true);
  }

  private testExperiment = (
    experiment: IExperimentResult,
    from: sourceType,
    t: tape.Test,
    fromHourAgo: number = Number.MAX_SAFE_INTEGER,
  ): boolean => {
    if (
      (new Date().getTime() - experiment.created.getTime()) / 1000 >
      60 * 60 * fromHourAgo
    ) {
      return true;
    }

    console.log('\n');
    t.comment(`--- name: ${experiment.name}`);

    from === sourceType.item
      ? (this.methodEachCount += experiment.algorithms.length)
      : (this.methodListCount += experiment.algorithms.length);

    t.ok(
      experiment.algorithms.every((a: any) => a),
      `algorithms: ${JSON.stringify(experiment.algorithms)}`,
    );
    t.ok(experiment.created, `should have created date: ${experiment.created}`);

    t.ok(experiment.name, `should have name: ${experiment.name}`);
    t.ok(
      typeof experiment.resultsViewed === 'boolean',
      `resultsViewed: ${experiment.resultsViewed}`,
    );
    t.ok(experiment.uuid, `should have uuid: ${experiment.uuid}`);
    t.ok(
      experiment.modelDefinitionId,
      `should have modelDefinitionId: ${experiment.modelDefinitionId}`,
    );
    t.ok(
      experiment.user.fullname,
      `should have user fullname: ${experiment.user.fullname}`,
    );
    t.ok(experiment.user.username, 'should have user.username');

    if (experiment.modelDefinitionId) {
      t.ok(
        experiment.modelDefinitionId,
        `should have experiment.modelDefinition: ${JSON.stringify(
          experiment.modelDefinitionId,
        )}`,
      );
    }

    if (experiment.results) {
      const nodes: INode[] = experiment.results;
      nodes.forEach(node => {
        t.ok(node.name, `should have node.name: ${node.name}`);
        t.ok(node.methods, `should have node.methods: ${node.methods.length}`);

        node.methods.forEach((method, i) => {
          t.ok(method.mime, `should have method.mime: ${method.mime}`);
          t.ok(
            method.algorithm,
            `should have  method.algorithm: ${method.algorithm}`,
          );
          t.ok(
            method.data || method.error,
            'should have method.data or method.error',
          );

          if (!method.error) {
            t.ok(
              node.methods.length === experiment.algorithms.length,
              `node.methods.length should be equal to experiment.algorithms.length: ${
                node.methods.length
              } === ${experiment.algorithms.length}`,
            );

            t.ok(
              method.data,
              `method.data: ${method.data!.map(d =>
                JSON.stringify(d).substr(0, 20),
              )}`,
            );
            if (method.data) {
              t.ok(method.data.length, `method.data should be an array`);

              switch (method.mime) {
                case MIME_TYPES.HIGHCHARTS:
                  method &&
                    method.data.map(d =>
                      t.ok(d.series, `should have method.data[].d.chart`),
                    );
                  break;

                case MIME_TYPES.PLOTLY:
                  method &&
                    method.data.map(d =>
                      t.ok(d.data, `should have method.data[].d.data`),
                    );
                  break;

                case MIME_TYPES.PFA:
                  method &&
                    method.data.map((data, j) => {
                      if (data.error && i === 0 && j === 0) {
                        from === sourceType.item
                          ? this.methodEachErrorCount++
                          : this.methodListErrorCount++;
                      } else {
                        t.ok(
                          data.crossValidation || data.remoteValidation,
                          `should have data.crossValidation or data.remoteValidation`,
                        );

                        if (data.crossValidation) {
                          t.ok(
                            Object.keys(data.crossValidation),
                            `should have crossValidation keys: ${Object.keys(
                              data.crossValidation,
                            )}`,
                          );
                          if (data.crossValidation.confusionMatrix) {
                            t.ok(
                              Object.keys(data.crossValidation.confusionMatrix),
                              `should have confusionMatrix keys: ${Object.keys(
                                data.crossValidation.confusionMatrix,
                              )}`,
                            );
                          }
                        }

                        if (data.remoteValidation) {
                          t.ok(
                            Object.keys(data.remoteValidation),
                            `should have remoteValidation keys: ${Object.keys(
                              data.remoteValidation,
                            )}`,
                          );
                          if (data.remoteValidation.confusionMatrix) {
                            t.ok(
                              Object.keys(
                                data.remoteValidation.confusionMatrix,
                              ),
                              `should have confusionMatrix keys: ${Object.keys(
                                data.remoteValidation.confusionMatrix,
                              )}`,
                            );
                          }
                        }
                      }
                    });
                  break;

                case MIME_TYPES.JSON:
                  method &&
                    method.data.map(d =>
                      t.ok(Object.keys(d), `should have Object.keys(data[].d)`),
                    );
                  break;

                case MIME_TYPES.VISJS: // EXAREME
                  method &&
                    method.data.map(d =>
                      t.ok(d.match(/script/), `should match /script/`),
                    );
                  break;

                case MIME_TYPES.ERROR:
                  from === sourceType.item
                    ? this.methodEachErrorCount++
                    : this.methodListErrorCount++;
                  console.log(`#### ERROR #### ${MIME_TYPES.ERROR}`);
                  t.ok(
                    method.error,
                    `should have method.error ${method.error}`,
                  );
                  break;

                case MIME_TYPES.JSONDATA:
                  method &&
                    method.data.map(d =>
                      t.ok(Object.keys(d), `should have Object.keys(data[].d)`),
                    );
                  break;

                case MIME_TYPES.HTML:
                  method &&
                    method.data.map(d =>
                      t.ok(d.match(/DOCTYPE/), `should match /DOCTYPE/`),
                    );
                  break;

                case MIME_TYPES.TEXT:
                  method &&
                    method.data.map(d => t.ok(d, `should not be undefine`));
                  break;

                default:
                  t.fail(method.mime);
              }
            }
          } else {
            from === sourceType.item
              ? this.methodEachErrorCount++
              : this.methodListErrorCount++;
            console.log(`#### ERROR #### ${MIME_TYPES.ERROR}`);
            t.comment(`Error: ${method.error}`);
          }
        });
      });
    } else if (experiment.error) {
      console.log(`#### ERROR ####`);
      t.ok(experiment.error, `Error: ${experiment.error}`);
      from === sourceType.item
        ? this.methodEachErrorCount++
        : this.methodListErrorCount++;
    } else {
      const elapsed: number =
        (new Date().getTime() - experiment.created.getTime()) / 1000;

      t.ok(elapsed < 60 * 5, 'experiment is loading');
    }

    return true;
  }

  private hasNetworkError = (error: string | undefined): boolean => {
    if (
      (error && error.match(/ECONNREFUSED/)) ||
      (error && error.match(/Forbidden/))
    ) {
      console.log({ error });
      process.exit(1);
      return true;
    }

    return false;
  }

  private runAndWaitExperiment = async (
    experiment: any,
    slug: any,
  ): Promise<{ experiment: any } | any> => {
    return new Promise(async resolve => {
      const exp = {
        algorithms: experiment.methods.map((m: any) => ({
          code: m.code,
          name: m.code,
          parameters: m.parameters,
          validation: experiment.validations.length ? true : false,
        })),
        model: slug,
        name: experiment.name,
        validations: experiment.validations,
      };
      await experimentContainer.create(exp);

      const created: IExperimentResult | undefined =
        experimentContainer.state.experiment;
      const uuid: string | undefined = created && created.uuid;
      console.log('created', exp.name, uuid);

      this.hasNetworkError(experimentContainer.state.error);

      if (uuid) {
        const timerId = setInterval(async () => {
          const { loading, experiment } = await this.experimentLoadingStatus(
            uuid,
          );
          console.log({ loading });
          if (!loading) {
            clearInterval(timerId);
            resolve({ experiment });
          }
        },                          10 * 1000);
      }
    });
  }

  private experimentLoadingStatus = async (
    uuid: string,
  ): Promise<{ loading: boolean; experiment: any }> => {
    await experimentContainer.one(uuid);
    const state = experimentContainer.state;
    const experiment: IExperimentResult | undefined = state.experiment;

    const nodes = experiment && experiment.results;
    const error = (state && state.error) || (experiment && experiment.error);
    const loading = !nodes && !error;

    return { loading, experiment };
  }
}
