import * as Realm from "realm-web";
import { app } from "../realmConfig";
const dataBase = "Reserve-App-DB";
const defaultLinkedService = "mongodb-atlas";
function getCollection(db, collection, linkedService = defaultLinkedService) {
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
export default {
  getCollection,
  insertOne,
  findOne,
  find,
};
