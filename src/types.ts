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
