"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const trainingDatasetsValue = process.env.REACT_APP_TRAININGDATASETS;
const trainingDatasets = trainingDatasetsValue
    ? trainingDatasetsValue.split(',')
    : [];
const validationDatasetsValue = process.env.REACT_APP_VALIDATIONDATASETS;
const validationDatasets = validationDatasetsValue
    ? validationDatasetsValue.split(',')
    : [];
const Cookie = process.env.REACT_APP_COOKIE;
exports.config = process.env.NODE_ENV === 'production'
    ? {
        credentials: 'same-origin',
    }
    : Cookie
        ? {
            headers: {
                Authorization: process.env.REACT_APP_AUTHORIZATION,
                Cookie,
                'X-XSRF-TOKEN': Cookie.match(/XSRF-TOKEN=(.*)/)[1] || '',
            },
        }
        : {};
exports.models = {
    classification: {
        coVariables: [{ code: 'lefthippocampus' }],
        filters: '',
        groupings: [],
        testingDatasets: [],
        trainingDatasets,
        validationDatasets,
        variables: [{ code: 'alzheimerbroadcategory' }],
    },
    classification2: {
        coVariables: [{ code: 'apoe4' }],
        filters: '',
        groupings: [],
        testingDatasets: [],
        trainingDatasets,
        validationDatasets,
        variables: [{ code: 'alzheimerbroadcategory' }],
    },
    regression0: {
        coVariables: [{ code: 'subjectageyears' }],
        filters: '',
        groupings: [],
        testingDatasets: [],
        trainingDatasets,
        validationDatasets,
        variables: [{ code: 'lefthippocampus' }],
    },
    regression2: {
        coVariables: [{ code: 'alzheimerbroadcategory' }],
        filters: '',
        groupings: [],
        testingDatasets: [],
        trainingDatasets,
        validationDatasets,
        variables: [{ code: 'lefthippocampus' }],
    },
};
const kfold = {
    code: 'kfold',
    name: 'validation',
    parameters: [
        {
            code: 'k',
            value: '2',
        },
    ],
};
exports.experiments = [
    {
        model: exports.models.regression0,
        name: 'histograms',
        status: 'ok',
        methods: [
            {
                code: 'histograms',
                parameters: [],
            },
        ],
        validations: [],
    },
    {
        methods: [
            {
                code: 'linearRegression',
                parameters: [],
            },
        ],
        model: exports.models.regression0,
        name: 'linearRegression',
        status: 'ok',
        validations: [],
    },
    {
        methods: [
            {
                code: 'sgdLinearModel',
                parameters: [
                    {
                        code: 'alpha',
                        value: '0.0001',
                    },
                    {
                        code: 'penalty',
                        value: 'l2',
                    },
                    {
                        code: 'l1_ratio',
                        value: '0.15',
                    },
                ],
            },
        ],
        model: exports.models.regression0,
        name: 'sgdLinearModel',
        status: 'ok',
        validations: [kfold],
    },
    {
        methods: [
            {
                code: 'naiveBayes',
                parameters: [
                    {
                        code: 'alpha',
                        value: '1',
                    },
                    {
                        code: 'class_prior',
                        value: '',
                    },
                ],
            },
        ],
        model: exports.models.classification,
        name: 'naiveBayes',
        status: 'ok',
        validations: [kfold],
    },
    {
        methods: [
            {
                code: 'sgdNeuralNetwork',
                parameters: [
                    {
                        code: 'hidden_layer_sizes',
                        value: '100',
                    },
                    {
                        code: 'activation',
                        value: 'relu',
                    },
                    {
                        code: 'alpha',
                        value: '0.0001',
                    },
                    {
                        code: 'learning_rate_init',
                        value: '0.001',
                    },
                ],
            },
        ],
        model: exports.models.classification,
        name: 'sgdNeuralNetwork',
        status: 'ok',
        validations: [kfold],
    },
    {
        methods: [
            {
                code: 'gradientBoosting',
                parameters: [
                    {
                        code: 'learning_rate',
                        value: '0.1',
                    },
                    {
                        code: 'n_estimators',
                        value: '100',
                    },
                    {
                        code: 'max_depth',
                        value: '3',
                    },
                    {
                        code: 'min_samples_split',
                        value: '2',
                    },
                    {
                        code: 'min_samples_leaf',
                        value: '1',
                    },
                    {
                        code: 'min_weight_fraction_leaf',
                        value: '0',
                    },
                    {
                        code: 'min_impurity_decrease',
                        value: '0',
                    },
                ],
            },
        ],
        model: exports.models.classification,
        name: 'gradientBoosting',
        status: 'ok',
        validations: [kfold],
    },
    {
        methods: [
            {
                code: 'anova',
                parameters: [],
            },
        ],
        model: exports.models.regression2,
        name: 'anova',
        status: 'ok',
        validations: [],
    },
    {
        methods: [
            {
                code: 'knn',
                parameters: [
                    {
                        code: 'k',
                        value: '5',
                    },
                ],
            },
        ],
        model: exports.models.classification,
        name: 'knn',
        status: 'ok',
        validations: [kfold],
    },
    {
        methods: [
            {
                code: 'correlationHeatmap',
                parameters: [],
            },
        ],
        model: exports.models.regression0,
        name: 'correlationHeatmap',
        status: 'ko',
        validations: [],
    },
    {
        methods: [
            {
                code: 'pca',
                parameters: [],
            },
        ],
        model: exports.models.regression0,
        name: 'pca',
        status: 'ok',
        validations: [],
    },
    {
        methods: [
            {
                code: 'hedwig',
                parameters: [
                    {
                        code: 'beam',
                        value: '10',
                    },
                    {
                        code: 'support',
                        value: '0.1',
                    },
                ],
            },
        ],
        model: exports.models.classification2,
        name: 'hedwig',
        status: 'ko',
        validations: [],
    },
    {
        methods: [
            {
                code: 'hinmine',
                parameters: [
                    {
                        code: 'normalize',
                        value: 'true',
                    },
                    {
                        code: '0.85',
                        value: '0.85',
                    },
                ],
            },
        ],
        model: exports.models.classification,
        name: 'hinmine',
        status: 'ko',
        validations: [],
    },
    {
        methods: [
            {
                code: 'tSNE',
                parameters: [],
            },
            {
                code: 'linearRegression',
                parameters: [],
            },
        ],
        model: exports.models.regression0,
        name: 'tSNE-linearRegression',
        status: 'ok',
        validations: [],
    },
    {
        methods: [
            {
                code: 'ggparci',
                parameters: [],
            },
        ],
        model: exports.models.classification,
        name: 'ggparci',
        status: 'ko',
        validations: [],
    },
    {
        methods: [
            {
                code: 'kmeans',
                parameters: [],
            },
        ],
        model: exports.models.regression0,
        name: 'kmeans',
        status: 'ok',
        validations: [],
    },
    {
        methods: [
            {
                code: 'heatmaply',
                parameters: [],
            },
        ],
        model: exports.models.regression0,
        name: 'heatmaply',
        status: 'ko',
        validations: [],
    },
];
