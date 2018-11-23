export const models: any = {
  histogram1: {
    coVariables: [{ code: 'subjectageyears' }],
    filters: '',
    groupings: [{ code: 'gender' }, { code: 'alzheimerbroadcategory' }],
    testingDatasets: [],
    trainingDatasets: ['clm', /*'lille_chru', */ 'fbf'],
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
    trainingDatasets: ['adni', 'clm', 'fbf'],
    validationDatasets: [],
    variables: [{ code: 'righthippocampus' }],
  },
  classification1: {
    coVariables: [{ code: 'subjectageyears' }],
    filters:
      '{"condition":"AND","rules":[{"id":"subjectageyears","field":"subjectageyears","type":"integer","input":"number","operator":"greater","value":"50"},{"condition":"OR","rules":[{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"AD"},{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"CN"}]}],"valid":true}',
    groupings: [{ code: 'alzheimerbroadcategory' }],
    testingDatasets: [],
    trainingDatasets: ['adni'],
    validationDatasets: [],
    variables: [
      { code: 'righthippocampus' },
      { code: 'rightententorhinalarea' },
    ],
  },
  classification2: {
    coVariables: [{ code: 'subjectageyears' }],
    filters:
      '{"condition":"AND","rules":[{"id":"subjectageyears","field":"subjectageyears","type":"integer","input":"number","operator":"greater","value":"50"},{"condition":"OR","rules":[{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"AD"},{"id":"alzheimerbroadcategory","field":"alzheimerbroadcategory","type":"string","input":"select","operator":"equal","value":"CN"}]}],"valid":true}',
    groupings: [{ code: 'alzheimerbroadcategory' }],
    testingDatasets: [],
    trainingDatasets: ['adni', 'clm', 'fbf'],
    validationDatasets: [],
    variables: [
      { code: 'righthippocampus' },
      { code: 'rightententorhinalarea' },
    ],
  },
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
    name: 'linearRegression 1',
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
    name: 'linearRegression 2',
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
    name: 'linearRegression 3',
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
    model: models.regression1,
    name: 'Exareme linear regression 1',
    status: 'ok',

    methods: [
      {
        code: 'WP_LINEAR_REGRESSION',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.regression2,
    name: 'Exareme linear regression 2',
    status: 'ok',

    methods: [
      {
        code: 'WP_LINEAR_REGRESSION',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.regression3,
    name: 'Exareme linear regression 3',
    status: 'ok',

    methods: [
      {
        code: 'WP_LINEAR_REGRESSION',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.classification1,
    name: 'knn on adni',
    status: 'ok',

    methods: [
      {
        code: 'knn',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.classification1,
    name: 'naiveBayes  on adni',
    status: 'ok',

    methods: [
      {
        code: 'naiveBayes',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.classification2,
    name: 'knn on several datasets',
    status: 'ok',

    methods: [
      {
        code: 'knn',
        parameters: [],
      },
    ],
    validations: [],
  },
  {
    model: models.classification2,
    name: 'naiveBayes on several datasets',
    status: 'ok',

    methods: [
      {
        code: 'naiveBayes',
        parameters: [],
      },
    ],
    validations: [],
  },
];

export default { models, experiments}
