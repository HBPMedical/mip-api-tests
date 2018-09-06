"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mime types
const ERROR = "text/plain+error";
const HIGHCHARTS = "application/vnd.highcharts+json";
const JSON = "application/json";
const MIP_PFA = "application/vnd.hbp.mip.experiment.pfa+json";
const PFA = "application/pfa+json";
const PLOTLY = "application/vnd.plotly.v1+json";
exports.MIME_TYPES = {
    ERROR,
    HIGHCHARTS,
    JSON,
    MIP_PFA,
    PFA,
    PLOTLY
};
// aglorithms labels
const accuracy = { code: "Accuracy", label: "Accuracy" };
const f1score = {
    code: "Weighted F1-score",
    label: "Weighted F1-score"
};
const falsePositiveRate = {
    code: "Weighted false positive rate",
    label: "Weighted false positive rate"
};
const precision = {
    code: "Weighted precision",
    label: "Weighted precision"
};
const recall = { code: "Weighted recall", label: "Weighted recall" };
const confusionMatrix = {
    code: "Confusion matrix",
    label: "Confusion matrix"
};
const explainedVariance = {
    code: "Explained variance",
    label: "Explained variance"
};
const mae = { code: "MAE", label: "Mean absolute error" };
const mse = { code: "MSE", label: "Mean square error" };
const rsquared = {
    code: "R-squared",
    label: "Coefficient of determination (R²)"
};
const rmse = { code: "RMSE", label: "Root mean square error" };
const type = { code: "type", label: "Explained variance" };
exports.SCORES = {
    accuracy,
    confusionMatrix,
    explainedVariance,
    f1score,
    falsePositiveRate,
    mae,
    mse,
    precision,
    recall,
    rmse,
    rsquared,
    type
};
const f = { code: "F", label: "F-value", order: 2 };
const meansq = { code: "mean_sq", label: "", order: -1 };
const prf = { code: "PR(>F)", label: "P-value", order: 3 };
const sumsq = { code: "sum_sq", label: "Sum²", order: 0 };
const df = { code: "df", label: "Degrees of freedom", order: 1 };
exports.LABELS = [df, f, meansq, prf, sumsq];