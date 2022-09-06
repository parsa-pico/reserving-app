import realmService from "./realmService";
const dataBase = "Reserve-App-DB";
const collection = "ReservedTimes";
async function insertNewTime(data) {
  const result = await realmService.insertOne(dataBase, collection, data);
  return result.insertedId.toString();
}
export default {
  insertNewTime,
};
