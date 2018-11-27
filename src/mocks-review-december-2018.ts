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
    name: 'local linearRegression on adni',
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
    name: 'local linearRegression on clm',
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
    name: 'local linearRegression on adni clm fbf',
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
    name: 'Exareme linearRegression on adni',
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
    name: 'Exareme linearRegression on clm',
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
    name: 'Exareme linearRegression  on adni, clm, fbf',
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
    name: 'naiveBayes on adni',
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
    name: 'knn on adni, clm, fbf',
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
    name: 'naiveBayes on adni, clm, fbf',
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
    name: 'naiveBayes kfold=4  on adni, clm, fbf',
    status: 'ok',

    methods: [
      {
        code: 'naiveBayes',
        parameters: [
          { code: 'alpha', value: '1' },
          { code: 'class_prior', value: '' },
        ],
      },
    ],
    validations: [
      {
        code: 'kfold',
        name: 'validation',
        parameters: [
          {
            code: 'k',
            value: '4',
          },
        ],
      },
    ],
  },
];

export default { models, experiments };
