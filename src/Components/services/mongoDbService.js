import httpService from "./httpService";
const dataSource = "AtlasCluster";
const dataBase = "Reserve-App-DB2";
const apiEndpoint =
  "https://data.mongodb-api.com/app/data-wyjpw/endpoint/data/v1/action/";
const httpserviceConfig = {
  headers: {
    "Content-Type": "application/json",
    "api-key":
      "o8JPK6wxxaabF8hzK6o3MPE08xCCfPEZg2179Gf1pyIXMrYchVelLMdJthxr0g0d",
  },
};
async function post(data, collection) {
  const mongoDbObj = {
    dataSource: dataSource,
    database: dataBase,
    collection: collection,
    document: { ...data },
  };
  await httpService.post(
    apiEndpoint + "insertOne",
    mongoDbObj,
    httpserviceConfig
  );
}

export default {
  post,
};
