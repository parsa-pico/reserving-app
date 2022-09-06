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
async function insertOne(db, mycollection, data) {
  const collection = getCollection(db, mycollection);
  return await collection.insertOne(data);
}
export default {
  getCollection,
  insertOne,
};
