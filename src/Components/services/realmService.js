import * as Realm from "realm-web";
import { app } from "../realmConfig";
const dataBase = "Reserve-App-DB";
const defaultLinkedService = "mongodb-atlas";
function getCollection(
  db = dataBase,
  collection,
  linkedService = defaultLinkedService
) {
  return app.currentUser
    .mongoClient(linkedService)
    .db(db)
    .collection(collection);
}
async function insertOne(mycollection, data, db = dataBase) {
  const collection = getCollection(db, mycollection);
  return await collection.insertOne(data);
}
async function findOne(mycollection, queryObj, db = dataBase) {
  const collection = getCollection(db, mycollection);
  return await collection.findOne(queryObj);
}
async function find(mycollection, queryObj, db = dataBase) {
  const collection = getCollection(db, mycollection);
  return await collection.find(queryObj);
}
async function updateOne(
  mycollection,
  queryObj,
  data,
  upsert = false,
  db = dataBase
) {
  const collection = getCollection(db, mycollection);
  return await collection.updateOne(
    queryObj,
    { $set: data },
    {
      upsert,
    }
  );
}
async function updateMany(mycollection, queryObj, data, db = dataBase) {
  const collection = getCollection(db, mycollection);
  return await collection.updateMany(queryObj, { $set: data });
}
async function deleteOne(mycollection, queryObj, db = dataBase) {
  const collection = getCollection(db, mycollection);
  return await collection.deleteOne(queryObj);
}
async function deleteMany(mycollection, queryObj, db = dataBase) {
  const collection = getCollection(db, mycollection);
  return await collection.deleteMany(queryObj);
}
export default {
  getCollection,
  insertOne,
  findOne,
  find,
  updateOne,
  updateMany,
  deleteMany,
  deleteOne,
};
