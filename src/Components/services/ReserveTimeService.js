import realmService from "./realmService";
//const dataBase = "Reserve-App-DB";
const collection = "ReservedTimes";
async function insertNewTime(data) {
  const result = await realmService.insertOne(collection, data);
  return result.insertedId.toString();
}
async function findOne(queryObj) {
  const result = await realmService.findOne(collection, queryObj);
  result._id = result._id.toString();
  return result;
}
async function find(queryObj) {
  const result = await realmService.find(collection, queryObj);
  // result._id = result._id.toString();
  // return result;
  return result;
}
async function updateOne(queryObj, data) {
  const result = await realmService.updateOne(collection, queryObj, data);
  return result;
}
async function updateMany(queryObj, data) {
  const result = await realmService.updateMany(collection, queryObj, data);
  return result;
}
export default {
  insertNewTime,
  findOne,
  find,
  updateOne,
  updateMany,
};
