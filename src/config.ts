
// mocksAll,
// mocksReviewDecember2018,
// mocksReviewMay2018,
const MOCK_FILE = 'mocksReviewMay2018';   

const BACKEND_URL = 'http://frontend/services'; 
const USERNAME = 'anonymous';
const TRAININGDATASETS = 'clm,adni,fbf,edsd,lille_chru,ppmi';
const VALIDATIONDATASETS = '';
const COOKIE: string = ''; //  "JSESSIONID=; XSRF-TOKEN=" // To be found in the Cookie from the web session

const options: any = {
  headers: {
    Authorization: 'Basic c2dhMXJldmlld2VyczpIQlBzZ2Ex',
    Cookie: COOKIE,
    'X-XSRF-TOKEN': (COOKIE && COOKIE.match(/XSRF-TOKEN=(.*)/)![1]) || '',
  },
};

export default {
  baseUrl: BACKEND_URL,
  options,
  TRAININGDATASETS,
  username: USERNAME,
  VALIDATIONDATASETS,
  MOCK_FILE
};


// const BACKEND_URL = 'http://155.105.202.79/services';
// const USERNAME = 'anonymous';
// const TRAININGDATASETS = 'adni';

// const BACKEND_URL = "https://mip.humanbrainproject.eu/services"
// const USERNAME = 'manu';
// const TRAININGDATASETS = "adni"
// const VALIDATIONDATASETS = ""

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

