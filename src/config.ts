import * as dotenv from "dotenv";

dotenv.config();

const Cookie = process.env.COOKIE;

const options: any ={
    headers: {
      Authorization: process.env.AUTHORIZATION!,
      Cookie,
      'X-XSRF-TOKEN': (Cookie && Cookie.match(/XSRF-TOKEN=(.*)/)![1]) || '',
    },
  };

const baseUrl = `${process.env.BACKEND_URL}`;
const username = process.env.USERNAME;

export default { options, baseUrl, username };
