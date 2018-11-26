import { IModelNames } from './types';

export const models: IModelNames = {
  mocalimbic: {
    coVariables: [
      {
        code: 'lefthippocampus',
      },
      {
        code: 'leftthalamusproper',
      },
      {
        code: 'leftacgganteriorcingulategyrus',
      },
      {
        code: 'leftententorhinalarea',
      },
      {
        code: 'leftmcggmiddlecingulategyrus',
      },
      {
        code: 'leftphgparahippocampalgyrus',
      },
      {
        code: 'leftpcggposteriorcingulategyrus',
      },
      {
        code: 'righthippocampus',
      },
      {
        code: 'rightthalamusproper',
      },
      {
        code: 'rightacgganteriorcingulategyrus',
      },
      {
        code: 'rightententorhinalarea',
      },
      {
        code: 'rightmcggmiddlecingulategyrus',
      },
      {
        code: 'rightphgparahippocampalgyrus',
      },
      {
        code: 'rightpcggposteriorcingulategyrus',
      },
    ],
    filters: '',
    groupings: [],
    testingDatasets: [],
    trainingDatasets: ['fbf', 'clm'],
    validationDatasets: [],
    variables: [{ code: 'montrealcognitiveassessment' }],
  },
};

models.mocalimbic2 = {
  filters:
    '{"condition":"AND","rules":[{"id":"subjectageyears","field":"subjectageyears","type":"integer","input":"number","operator":"greater","value":"50"}]}',
  ...models.mocalimbic,
};

models.mocalimbic3 = {
  coVariables: [
    {
      code: 'lefthippocampus',
    },

    {
      code: 'leftententorhinalarea',
    },
  ],
  trainingDatasets: ['adni'],
  ...models.mocalimbic,
};

models.mocalimbic4 = {
  trainingDatasets: ['fbf'],
  ...models.mocalimbic3,
};

models.mocalimbic5 = {
  trainingDatasets: ['clm'],
  ...models.mocalimbic3,
};

models.mocalimbic6 = {
  trainingDatasets: ['clm', 'fbf', 'adni'],
  ...models.mocalimbic3,
};

models.mocalimbic7 = {
  coVariables: [
    {
      code: 'leftententorhinalarea',
    },
  ],
  variables: [{ code: 'clmcategory' }],
  filters: "\"condition\":\"AND\",\"rules\":[{\"id\":\"gender\",\"field\":\"gender\",\"type\":\"string\",\"input\":\"select\",\"operator\":\"equal\",\"value\":\"F\"},{\"condition\":\"AND\",\"rules\":[{\"id\":\"clmcategory\",\"field\":\"clmcategory\",\"type\":\"string\",\"input\":\"select\",\"operator\":\"equal\",\"value\":\"Alzheimer's disease, atypical or mixed type\"},{\"id\":\"clmcategory\",\"field\":\"clmcategory\",\"type\":\"string\",\"input\":\"select\",\"operator\":\"equal\",\"value\":\"MCI\"},{\"id\":\"clmcategory\",\"field\":\"clmcategory\",\"type\":\"string\",\"input\":\"select\",\"operator\":\"equal\",\"value\":\"Subjective cognitive complaints\"}]}],\"valid\":true}",
  trainingDatasets: ['clm'],
  ...models.mocalimbic3,
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
    model: models.mocalimbic,
    name: 'anova moca-limbic on clm, fbf',
    status: 'ok',

    methods: [
      {
        code: 'anova',
        parameters: [{ code: 'design', value: 'additive' }],
      },
    ],
    validations: [],
  },
  {
    model: models.mocalimbic2,
    name: 'anova moca-limbic with age filter on clm, fbf',
    status: 'ok',

    methods: [
      {
        code: 'anova',
        parameters: [{ code: 'design', value: 'additive' }],
      },
    ],
    validations: [],
  },
  {
    model: models.mocalimbic3,
    name: 'local linearRegression moca-limbic on adni',
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
    model: models.mocalimbic4,
    name: 'local linearRegression moca-limbic on fbf',
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
    model: models.mocalimbic5,
    name: 'local linearRegression moca-limbic on clm',
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
    model: models.mocalimbic6,
    name: 'federated linearRegression moca-limbic on clm',
    status: 'ok',

    methods: [
      {
        code: 'WP_LINEAR_REGRESSION',
        parameters: [],
      },
    ],
    validations: [],
  },
];

export default { models, experiments };
