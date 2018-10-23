import * as dotenv from "dotenv";

dotenv.config();

// const trainingDatasetsValue = process.env.REACT_APP_TRAININGDATASETS;
// const trainingDatasets: string[] = trainingDatasetsValue
//   ? trainingDatasetsValue.split(",")
//   : [];
// const validationDatasetsValue = process.env.REACT_APP_VALIDATIONDATASETS;
// const validationDatasets: string[] = validationDatasetsValue
//   ? validationDatasetsValue.split(",")
//   : [];
const Cookie = process.env.REACT_APP_COOKIE;

const options: any ={
    headers: {
      Authorization: process.env.AUTHORIZATION!,
      Cookie,
      'X-XSRF-TOKEN': (Cookie && Cookie.match(/XSRF-TOKEN=(.*)/)![1]) || '',
    },
  };

const baseUrl = `${process.env.BACKEND_URL}`;

export default  { options, baseUrl };
