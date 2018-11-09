import * as dotenv from 'dotenv';
dotenv.config();

// const trainingDatasetsValue = process.env.TRAININGDATASETS;
// const trainingDatasets = trainingDatasetsValue
//   ? trainingDatasetsValue.split(',')
//   : [];
// const validationDatasetsValue = process.env.VALIDATIONDATASETS;
// const validationDatasets: string[] = validationDatasetsValue
//   ? validationDatasetsValue.split(',')
//   : [];

interface ICode {
  code: string;
}

export interface IModels {
  [key: string]: IModel;
}

export interface IModel {
  coVariables: ICode[];
  filters: string;
  groupings: ICode[];
  testingDatasets: string[];
  trainingDatasets: string[];
  validationDatasets: string[];
  variables: ICode[];
}

// export interface IModelNames {
//   [key: string]: IModel;
//   // histogram1: IModel;
//   regression1: IModel;
//   regression2: IModel;
//   regression3: IModel;
// }

export interface IMethod {
  code: string;
  parameters: Array<any>;
}

export interface IExperiment {
  model: IModel;
  name: string;
  status: string;
  methods: IMethod[];
  validations: Array<any>;
  uuid?: string;
}

export const models: any = {
  histogram1: {
    coVariables: [{ code: 'subjectageyears' }],
    filters: '',
    groupings: [{ code: 'gender' }, { code: 'alzheimerbroadcategory' }],
    testingDatasets: [],
    trainingDatasets: ['clm', 'lille_chru','fbf'],
    validationDatasets: [],
    variables: [{ code: 'lefthippocampus' }],
  },
  regression1: {
    coVariables: [{ code: 'subjectageyears' }],
    filters:
      '{"condition":"AND","rules":[{"id":"subjectageyears","field":"subjectageyears","type":"integer","input":"number","operator":"greater","value":"50"},{"condition":"OR","rules":[{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"AD"},{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"CN"}]}],"valid":true}',
    groupings: [{ code: 'alzheimerbroadcategory' }],
    testingDatasets: [],
    trainingDatasets: ['adni'],
    validationDatasets: [],
    variables: [{ code: 'righthippocampus' }],
  },
  regression2: {
    coVariables: [{ code: 'subjectageyears' }],
    filters:
      '{"condition":"AND","rules":[{"id":"subjectageyears","field":"subjectageyears","type":"integer","input":"number","operator":"greater","value":"50"},{"condition":"OR","rules":[{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"AD"},{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"CN"}]}],"valid":true}',
    groupings: [{ code: 'alzheimerbroadcategory' }],
    testingDatasets: [],
    trainingDatasets: ['clm'],
    validationDatasets: [],
    variables: [{ code: 'righthippocampus' }],
  },
  regression3: {
    coVariables: [{ code: 'subjectageyears' }],
    filters:
      '{"condition":"AND","rules":[{"id":"subjectageyears","field":"subjectageyears","type":"integer","input":"number","operator":"greater","value":"50"},{"condition":"OR","rules":[{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"AD"},{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"CN"}]}],"valid":true}',
    groupings: [{ code: 'alzheimerbroadcategory' }],
    testingDatasets: [],
    trainingDatasets: ['adni', 'clm','fbf'],
    validationDatasets: [],
    variables: [{ code: 'righthippocampus' }],
  }
};

// const kfold = {
//   code: 'kfold',
//   name: 'validation',
//   parameters: [
//     {
//       code: 'k',
//       value: '2',
//     },
//   ],
// };

export const experiments = [
  {
    model: models.histogram1,
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
    model: models.regression1,
    name: 'regression1',
    status: 'ok',

    methods: [
      {
        code: 'linearRegression',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.regression2,
    name: 'regression2',
    status: 'ok',

    methods: [
      {
        code: 'linearRegression',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.regression3,
    name: 'regression3',
    status: 'ok',

    methods: [
      {
        code: 'linearRegression',
        parameters: [],
      },
    ],
    validations: [],
  },

  // {
  //   methods: [
  //     {
  //       code: 'linearRegression',
  //       parameters: [],
  //     },
  //   ],
  //   model: models.regression2,
  //   name: 'linearRegression',
  //   status: 'ok',
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'sgdLinearModel',

  //       parameters: [
  //         {
  //           code: 'alpha',
  //           value: '0.0001',
  //         },
  //         {
  //           code: 'penalty',
  //           value: 'l2',
  //         },
  //         {
  //           code: 'l1_ratio',
  //           value: '0.15',
  //         },
  //       ],
  //     },
  //   ],
  //   model: models.regression2,
  //   name: 'sgdLinearModel',
  //   status: 'ok',
  //   validations: [kfold],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'naiveBayes',

  //       parameters: [
  //         {
  //           code: 'alpha',
  //           value: '1',
  //         },
  //         {
  //           code: 'class_prior',
  //           value: '',
  //         },
  //       ],
  //     },
  //   ],
  //   model: models.classification1,
  //   name: 'naiveBayes',
  //   status: 'ok',
  //   validations: [kfold],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'sgdNeuralNetwork',

  //       parameters: [
  //         {
  //           code: 'hidden_layer_sizes',
  //           value: '100',
  //         },
  //         {
  //           code: 'activation',
  //           value: 'relu',
  //         },
  //         {
  //           code: 'alpha',
  //           value: '0.0001',
  //         },
  //         {
  //           code: 'learning_rate_init',
  //           value: '0.001',
  //         },
  //       ],
  //     },
  //   ],
  //   model: models.classification1,
  //   name: 'sgdNeuralNetwork',
  //   status: 'ok',
  //   validations: [kfold],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'gradientBoosting',

  //       parameters: [
  //         {
  //           code: 'learning_rate',
  //           value: '0.1',
  //         },
  //         {
  //           code: 'n_estimators',
  //           value: '100',
  //         },
  //         {
  //           code: 'max_depth',
  //           value: '3',
  //         },
  //         {
  //           code: 'min_samples_split',
  //           value: '2',
  //         },
  //         {
  //           code: 'min_samples_leaf',
  //           value: '1',
  //         },
  //         {
  //           code: 'min_weight_fraction_leaf',
  //           value: '0',
  //         },
  //         {
  //           code: 'min_impurity_decrease',
  //           value: '0',
  //         },
  //       ],
  //     },
  //   ],
  //   model: models.classification1,
  //   name: 'gradientBoosting',
  //   status: 'ok',
  //   validations: [kfold],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'anova',
  //       parameters: [],
  //     },
  //   ],
  //   model: models.regression1,
  //   name: 'anova',
  //   status: 'ok',
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'knn',
  //       parameters: [
  //         {
  //           code: 'k',
  //           value: '5',
  //         },
  //       ],
  //     },
  //   ],
  //   model: models.classification1,
  //   name: 'knn',
  //   status: 'ok',
  //   validations: [kfold],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'correlationHeatmap', // no displayable result, what variables should be used?
  //       parameters: [],
  //     },
  //   ],
  //   model: models.regression2,
  //   name: 'correlationHeatmap',
  //   status: 'ko',
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'pca',
  //       parameters: [],
  //     },
  //   ],
  //   model: models.regression2,
  //   name: 'pca',
  //   status: 'ok',

  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'hedwig', // Job dcb21fac-6766-43af-87c2-b8921c5734ef using hbpmip/python-jsi-hedwig:1.0.7 has completed in Chronos, but encountered timeout while waiting for job results. Does the algorithm store its results or errors in the output database?
  //       parameters: [
  //         {
  //           code: 'beam',
  //           value: '10',
  //         },
  //         {
  //           code: 'support',
  //           value: '0.1',
  //         },
  //       ],
  //     },
  //   ],
  //   model: models.classification2,
  //   name: 'hedwig',
  //   status: 'ko',
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'hinmine',
  //       parameters: [
  //         {
  //           code: 'normalize',
  //           value: 'true',
  //         },
  //         {
  //           code: '0.85',
  //           value: '0.85',
  //         },
  //       ],
  //     },
  //   ],
  //   model: models.classification1,
  //   name: 'hinmine',
  //   status: 'ko',
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'tSNE',
  //       parameters: [],
  //     },
  //     {
  //       code: 'linearRegression',
  //       parameters: [],
  //     },
  //   ],
  //   model: models.regression2,
  //   name: 'tSNE-linearRegression',
  //   status: 'ok',
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'ggparci',
  //       parameters: [],
  //     },
  //   ],
  //   model: models.classification1,
  //   name: 'ggparci',
  //   status: 'ko', // Error in if (min(data_to_plot$value) >= 0 & max(data_to_plot$value) <= : missing value where TRUE/FALSE needed
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'kmeans',
  //       parameters: [],
  //     },
  //   ],
  //   model: models.regression2,
  //   name: 'kmeans',
  //   status: 'ok',
  //   validations: [],
  // },
  // {
  //   methods: [
  //     {
  //       code: 'heatmaply',
  //       parameters: [],
  //     },
  //   ],
  //   model: models.regression2,
  //   name: 'heatmaply',
  //   status: 'ko', // Error in hclustfun_col(dist_x): must have n >= 2 objects to cluster
  //   validations: [],
  // },

  // { code: "WP_VARIABLES_HISTOGRAM" },
  // { code: "PIPELINE_ISOUP_REGRESSION_TREE_SERIALIZER" },
  // { code: "PIPELINE_ISOUP_MODEL_TREE_SERIALIZER" },
  // { code: "WP_LINEAR_REGRESSION" },
  // { code: "K_MEANS" }
];
