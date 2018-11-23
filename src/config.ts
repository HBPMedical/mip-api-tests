import { experiments, models } from './mocks';

const AUTHORIZATION = 'Basic c2dhMXJldmlld2VyczpIQlBzZ2Ex';

const USERNAME = 'anonymous';
const BACKEND_URL = 'http://155.105.202.79/services';
const TRAININGDATASETS = 'clm,adni,fbf,edsd,lille_chru,ppmi';
const VALIDATIONDATASETS = '';
const COOKIE: string = '';

// const BACKEND_URL = "https://mip.humanbrainproject.eu/services"
// const TRAININGDATASETS = "edsd,adni"
// const VALIDATIONDATASETS = "clm"
// const const COOKIE = "JSESSIONID=3F48B19313A17A6DD69E7E5BC2CA1B68; XSRF-TOKEN=c9b88986-f271-4c2c-9fef-ab298883b412"

// const BACKEND_URL = "https://staging.mip.chuv.ch/services"
// const COOKIE = "JSESSIONID=21BE00AF772ABEF049DF8974426175A9; XSRF-TOKEN=c9ac7279-a6be-4cd5-861c-695d9cb1afcf"
// const TRAININGDATASETS = "clm,ppmi,edsd,adni"

// const BACKEND_URL = "https://mipbrescia.ddns.net/services"
// const TRAININGDATASETS = "fbf,edsd,ppmi,adni"
// const COOKIE = "JSESSIONID=B819535A6DCE6C9BE0DEBB900E5FD48C;  XSRF-TOKEN=ecec1a2c-9939-4b03-94e3-7b30ef5297f1"

// const BACKEND_URL = "https://qa.mip.chuv.ch/services"
// const TRAININGDATASETS = "fbf,clm,ppmi"
// const VALIDATIONDATASETS = "edsd,adni"
// const COOKIE = "JSESSIONID=F3652C04D992A285DDA8A08FD1AFC3B2;  XSRF-TOKEN=93462431-fc9b-47a0-95c3-e9c5db6490dc"

// const BACKEND_URL = "https://blc-mondino2.unipv.it/services"
// const TRAININGDATASETS = "IRCCSPavia,ppmi,edsd,adni"
// const COOKIE = "JSESSIONID=DCD79267AA2494EC0B8B623242C3526C;  XSRF-TOKEN=441866ae-655c-463d-913c-84ae5ecbc11c"

// const BACKEND_URL = "https://mipbesta.ddns.net/services"
// const TRAININGDATASETS = "IRCCSBesta,ppmi,edsd,adni"
// const COOKIE = "JSESSIONID=06A579BFED8AB13C1A4F888E82CBAFC2;  XSRF-TOKEN=69e81d87-7d16-42eb-b9a5-722188a3bead"

const options: any = {
  headers: {
    Authorization: AUTHORIZATION,
    Cookie: COOKIE,
    'X-XSRF-TOKEN': (COOKIE && COOKIE.match(/XSRF-TOKEN=(.*)/)![1]) || '',
  },
};

const baseUrl = BACKEND_URL;
const username = USERNAME;

export default {
  baseUrl,
  experiments,
  models,
  options,
  TRAININGDATASETS,
  username,
  VALIDATIONDATASETS
};
