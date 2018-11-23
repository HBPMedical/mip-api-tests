const MOCK_FILE = 'review'; // all


const BACKEND_URL = 'http://frontend/services';
const USERNAME = 'anonymous';
const TRAININGDATASETS = 'clm,adni,fbf,edsd,lille_chru,ppmi';
const VALIDATIONDATASETS = '';
const COOKIE: string = '';

// const BACKEND_URL = 'http://155.105.202.79/services';
// const USERNAME = 'anonymous';
// const TRAININGDATASETS = 'adni';

// const BACKEND_URL = "https://mip.humanbrainproject.eu/services"
// const USERNAME = 'manu';
// const TRAININGDATASETS = "adni"
// const VALIDATIONDATASETS = ""
// const COOKIE = "JSESSIONID=F0D796F3A703E41D4910111CFE994766; XSRF-TOKEN=41c99596-b761-4db3-bf27-7c6486e8f82f"

// const BACKEND_URL = "https://staging.mip.chuv.ch/services"
// const TRAININGDATASETS = "clm,ppmi,edsd,adni"

// const BACKEND_URL = "https://mipbrescia.ddns.net/services"
// const TRAININGDATASETS = "fbf,edsd,ppmi,adni"

// const BACKEND_URL = "https://qa.mip.chuv.ch/services"
// const TRAININGDATASETS = "fbf,clm,ppmi"
// const VALIDATIONDATASETS = "edsd,adni"

// const BACKEND_URL = "https://blc-mondino2.unipv.it/services"
// const TRAININGDATASETS = "IRCCSPavia,ppmi,edsd,adni"

// const BACKEND_URL = "https://mipbesta.ddns.net/services"
// const TRAININGDATASETS = "IRCCSBesta,ppmi,edsd,adni"

const AUTHORIZATION = 'Basic c2dhMXJldmlld2VyczpIQlBzZ2Ex';

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
  options,
  TRAININGDATASETS,
  username,
  VALIDATIONDATASETS,
  MOCK_FILE
};
