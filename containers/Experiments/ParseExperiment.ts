// tslint:disable:no-console
import {
  IExperimentResult,
  IKfoldValidationScore,
  IMethod,
  INode,
  IPolynomialClassificationScore,
  IValidationScore,
} from '../../types';
import { MIME_TYPES, SCORES } from '../../constants';

class ParseExperiment {
  public static parse = (experiment: any): IExperimentResult => {
    // Formats are differents in the API for 1 experiment and array of experiments,
    // apply specific parsing to some terms
    const algorithms = parse(experiment.algorithms);
    const created = (() => {
      const d = Date.parse(experiment.created + ' GMT');
      if (isNaN(d)) {
        return new Date(experiment.created);
      }

      return new Date(d);
    })();
    const modelDefinitionId = experiment.model ? experiment.model.slug : null;

    let experimentResult: IExperimentResult = {
      algorithms: algorithms.map((e: any) => e.name),
      created,
      modelDefinitionId,
      name: experiment.name,
      resultsViewed: experiment.resultsViewed,
      user: {
        fullname: experiment.createdBy.fullname,
        username: experiment.createdBy.username,
      },
      uuid: experiment.uuid,
    };

    // Errors
    if (!modelDefinitionId) {
      experimentResult = {
        ...experimentResult,
        modelDefinitionId: "undefined",
        error: 'No model defined',
      };

      return experimentResult;
    }

    if (experiment.hasServerError) {
      experimentResult = {
        ...experimentResult,
        error: `${experiment.result}`,
      };

      return experimentResult;
    }

    if (!experiment.result) {
      const elapsed: number =
        (new Date().getTime() - experimentResult.created.getTime()) / 1000;

      if (elapsed > 60 * 5) {
        experimentResult = {
          ...experimentResult,
          error: 'Timeout after 5 mn',
        };
      }

      return experimentResult;
    }

    // Results
    const resultParsed = parse(experiment.result);
    const result = Array.isArray(resultParsed) ? resultParsed : [resultParsed];
    const nodes: INode[] = [];

    result.forEach((r: any, i: number) => {
      // if (r.Error) {
      //   // EXAREME

      //   return {
      //     ...experimentResult,
      //     error: r.Error,
      //   };
      // }

      const mime = r.type;
      const algorithm =
        experimentResult.algorithms.length - 1 === i
          ? experimentResult.algorithms[i]
          : experimentResult.algorithms[0];
      let method: IMethod = {
        algorithm: r.algorithm || algorithm,
        mime,
      };

      // if (!method.mime) {
      //   console.log('\n\n', experiment, '\n', {
      //     resultParsed,
      //     experimentResult,
      //     r,
      //     method,
      //   });
      //   process.exit(1);

      //   return experimentResult;
      // }
      // Convert to array to have consistent results
      const normalizedResult = (input: any) =>
        (input.data && (input.data.length ? input.data : [input.data])) || null;
      const results = normalizedResult(r);

      switch (mime) {
        case MIME_TYPES.HIGHCHARTS:
          method.data = highcharts(results);
          break;

        case MIME_TYPES.PLOTLY:
          method.data = plotly(results);
          break;

        case MIME_TYPES.PFA:
          method.data = [pfa(results)];
          break;

        case MIME_TYPES.JSON:
          method.data = jsonTest(results);
          break;

        // case "application/vnd.dataresource+json":
        //   break;

        case 'application/vnd.visjs+javascript': // EXAREME
          method.data = results[0].data.result;
          method.mime = 'exareme';
          break;

        case MIME_TYPES.ERROR:
          method.error = errorTest(results, r.error);
          break;

        case MIME_TYPES.MIP_PFA:
          results.forEach((aResult: any) => {
            let subResult = aResult;

            // Lift the data one level up if needed
            if (!subResult.type && aResult.data) {
              subResult = normalizedResult(aResult);
            }
            method.mime = subResult.type;
            method.algorithm = subResult.algorithm;

            switch (subResult.type) {
              case MIME_TYPES.HIGHCHARTS:
                method.data = highcharts(normalizedResult(subResult));
                break;

              case MIME_TYPES.JSON:
                method.data = jsonTest(normalizedResult(subResult));
                break;

              case MIME_TYPES.ERROR:
                method.error = errorTest(subResult, null);
                break;

              case MIME_TYPES.PLOTLY:
                method.data = plotly(subResult);
                break;

              case MIME_TYPES.PFA:
                method.data = [pfa(normalizedResult(subResult))];
                break;

              default:
                console.log('!!!!!!!! SHOULD TEST', subResult.type);
            }
          });

        default:
          method = {
            ...method,
            algorithm: 'no data',
            error: 'no data',
            mime: 'no data',
          };
      }

      // In case we have 2 methods on 2 same nodes
      // merge nodes
      if (nodes.length) {
        const node: INode | undefined =
          nodes && nodes.find((n: any) => n.name === r.node);
        if (node) {
          node.methods.push(method);
        }
      } else {
        const node: INode = {
          methods: [method],
          name: r.node || 'Default',
        };
        nodes.push(node);
      }
    });
    experimentResult.nodes = nodes;

    return experimentResult;
  }
}

export default ParseExperiment;

const highcharts = (data: any) => {
  return data;
};

const plotly = (data: any) => data && data;

interface IPfa {
  crossValidation?:
    | IKfoldValidationScore
    | IValidationScore
    | IPolynomialClassificationScore;
  data?: any;
  remoteValidations?:
    | INode
    | IKfoldValidationScore
    | IValidationScore
    | IPolynomialClassificationScore;
  error?: any;
}

const pfa = (data: any): IPfa => {
  const output: IPfa = {};

  data.forEach((d: any) => {
    if (!d.cells) {
      // output.data.push(d);
      output.error = 'WARNING, not handled';
    } else {
      if (d.cells.validations) {
        // Convert to array to have consistent results
        const init = d.cells.validations.init.length
          ? d.cells.validations.init
          : [d.cells.validations.init];

        const buildKFoldValidation = (dta: any) => ({
          explainedVariance: parseFloat(dta[SCORES.explainedVariance.code]),
          mae: parseFloat(dta[SCORES.mae.code]),
          mse: parseFloat(dta[SCORES.mse.code]),
          rmse: parseFloat(dta[SCORES.rmse.code]),
          rsquared: parseFloat(dta[SCORES.rsquared.code]),
          type: `${dta[SCORES.type.code]}`,
        });

        const buildValidation = (dta: any, node: any) => ({
          accuracy: parseFloat(dta[SCORES.accuracy.code]),
          confusionMatrix: dta[SCORES.confusionMatrix.code],
          f1score: parseFloat(dta[SCORES.f1score.code]),
          falsePositiveRate: parseFloat(dta[SCORES.falsePositiveRate.code]),
          node: `${node}`,
          precision: parseFloat(dta[SCORES.precision.code]),
          recall: parseFloat(dta[SCORES.recall.code]),
        });

        init.forEach((i: any) => {
          if (i.error) {
            output.error += i.error;
            return;
          } else {
            const node = i.node;
            if (i.code === 'kfold') {
              const dta: any = i.data.average;
              output.crossValidation = buildKFoldValidation(dta);
            }

            if (i.code === 'remote-validation') {
              const dta: any = i.data;
              if (dta.type === 'RegressionScore') {
                output.remoteValidations = buildKFoldValidation(dta);
              } else {
                output.remoteValidations = buildValidation(dta, node);
              }
            }
          }
        });
      }
    }
  });

  return output;
};

const jsonTest = (data: any) => {
  return data;
};

const errorTest = (data: any, error: any) => {
  let errorOutput;
  if (data) {
    try {
      const subError = JSON.parse(data);
      errorOutput = subError.error;
    } catch (e) {
      errorOutput = data.error;
    }
  } else {
    errorOutput = error;
  }

  return errorOutput.slice(-256);
};

const parse = (value: any) => {
  try {
    const json = JSON.parse(value);
    return json;
  } catch (e) {
    return value;
  }
};
