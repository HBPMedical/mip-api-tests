"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
class ParseExperiment {
}
ParseExperiment.parse = (experiment) => {
    // Formats are differents in the API for 1 experiment and array of experiments, apply specific parsing to some terms
    const algorithms = parse(experiment.algorithms);
    const created = (() => {
        const d = Date.parse(experiment.created + " GMT");
        if (isNaN(d)) {
            return new Date(experiment.created);
        }
        return new Date(d);
    })();
    let experimentResult = {
        algorithms: algorithms.map((e) => e.name),
        created,
        modelDefinitionId: experiment.model.slug,
        name: experiment.name,
        resultsViewed: experiment.resultsViewed,
        user: {
            fullname: experiment.createdBy.fullname,
            username: experiment.createdBy.username
        },
        uuid: experiment.uuid
    };
    if (experiment.hasServerError) {
        experimentResult = Object.assign({}, experimentResult, { error: `${experiment.result}` });
        return experimentResult;
    }
    if (!experiment.result) {
        const elapsed = (new Date().getTime() - experimentResult.created.getTime()) / 1000;
        if (elapsed > 60 * 5) {
            experimentResult = Object.assign({}, experimentResult, { error: "Timeout after 5 mn" });
        }
        return experimentResult;
    }
    const result = parse(experiment.result);
    const nodes = [];
    // const distinctNodeCount = result
    //   .map((r: any) => r.node)
    //   .filter((el: any, i: any, a: any) => i === a.indexOf(el)).length;
    result.forEach((r, i) => {
        const mime = r.type;
        let method = {
            algorithm: r.algorithm,
            mime
        };
        // Convert to array to have consistent results
        const normalizedResult = (input) => (input.data && (input.data.length ? input.data : [input.data])) || null;
        const results = normalizedResult(r);
        switch (mime) {
            case constants_1.MIME_TYPES.HIGHCHARTS:
                method.data = highcharts(results);
                break;
            case constants_1.MIME_TYPES.PLOTLY:
                method.data = plotly(results);
                break;
            case constants_1.MIME_TYPES.PFA:
                method.data = [pfa(results)];
                break;
            case constants_1.MIME_TYPES.MIP_PFA:
                results.forEach((aResult) => {
                    let subResult = aResult;
                    // Lift the data one level up if needed
                    if (!subResult.type && aResult.data) {
                        subResult = normalizedResult(aResult);
                    }
                    method.mime = subResult.type;
                    method.algorithm = subResult.algorithm;
                    switch (subResult.type) {
                        case constants_1.MIME_TYPES.HIGHCHARTS:
                            method.data = highcharts(normalizedResult(subResult));
                            break;
                        case constants_1.MIME_TYPES.JSON:
                            method.data = jsonTest(normalizedResult(subResult));
                            break;
                        case constants_1.MIME_TYPES.ERROR:
                            method.error = errorTest(subResult, null);
                            break;
                        case constants_1.MIME_TYPES.PLOTLY:
                            console.log("application/vnd.plotly.v1+json");
                            break;
                        case constants_1.MIME_TYPES.PFA:
                            method.data = [pfa(normalizedResult(subResult))];
                            break;
                        default:
                            console.log("!!!!!!!! SHOULD TEST", subResult.type);
                    }
                });
            case constants_1.MIME_TYPES.JSON:
                method.data = jsonTest(results);
                break;
            // case "application/vnd.dataresource+json":
            //   break;
            // case "application/vnd.visjs+javascript":
            // break;
            case constants_1.MIME_TYPES.ERROR:
                method.error = errorTest(results, r.error);
                break;
            default:
                method = Object.assign({}, method, { algorithm: "no data", error: "no data", mime: "no data" });
        }
        // In case we have 2 methods on 2 same nodes
        // merge nodes
        if (nodes.length) {
            const node = nodes && nodes.find((n) => n.name === r.node);
            if (node) {
                node.methods.push(method);
            }
        }
        else {
            const node = {
                methods: [method],
                name: r.node || "Default"
            };
            nodes.push(node);
        }
    });
    experimentResult.nodes = nodes;
    return experimentResult;
};
exports.default = ParseExperiment;
const highcharts = (data) => {
    return data;
};
const plotly = (data) => {
    return data;
};
const pfa = (data) => {
    const output = {};
    data.forEach((d) => {
        if (!d.cells) {
            // output.data.push(d);
            output.error = "WARNING, not handled";
        }
        else {
            if (d.cells.validations) {
                // Convert to array to have consistent results
                const init = d.cells.validations.init.length
                    ? d.cells.validations.init
                    : [d.cells.validations.init];
                const buildKFoldValidation = (dta, node) => ({
                    explainedVariance: parseFloat(dta[constants_1.SCORES.explainedVariance.code]),
                    mae: parseFloat(dta[constants_1.SCORES.mae.code]),
                    mse: parseFloat(dta[constants_1.SCORES.mse.code]),
                    rmse: parseFloat(dta[constants_1.SCORES.rmse.code]),
                    rsquared: parseFloat(dta[constants_1.SCORES.rsquared.code]),
                    type: `${dta[constants_1.SCORES.type.code]}`
                });
                const buildValidation = (dta, node) => ({
                    accuracy: parseFloat(dta[constants_1.SCORES.accuracy.code]),
                    confusionMatrix: dta[constants_1.SCORES.confusionMatrix.code],
                    f1score: parseFloat(dta[constants_1.SCORES.f1score.code]),
                    falsePositiveRate: parseFloat(dta[constants_1.SCORES.falsePositiveRate.code]),
                    node: `${node}`,
                    precision: parseFloat(dta[constants_1.SCORES.precision.code]),
                    recall: parseFloat(dta[constants_1.SCORES.recall.code])
                });
                init.forEach((i) => {
                    if (i.error) {
                        output.error += i.error;
                        return;
                    }
                    else {
                        const node = i.node;
                        if (i.code === "kfold") {
                            const dta = i.data.average;
                            output.crossValidation = buildKFoldValidation(dta, node);
                        }
                        if (i.code === "remote-validation") {
                            const dta = i.data;
                            if (dta.type === "RegressionScore") {
                                output.remoteValidations = buildKFoldValidation(dta, node);
                            }
                            else {
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
const jsonTest = (data) => {
    return data;
};
const errorTest = (data, error) => {
    let errorOutput;
    if (data) {
        try {
            const subError = JSON.parse(data);
            errorOutput = subError.error;
        }
        catch (e) {
            errorOutput = data.error;
        }
    }
    else {
        errorOutput = error;
    }
    return errorOutput.slice(-256);
};
const parse = (value) => {
    try {
        const json = JSON.parse(value);
        return json;
    }
    catch (e) {
        return value;
    }
};
