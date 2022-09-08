import realmService from "./realmService";
import * as Realm from "realm-web";
import { app } from "../realmConfig";
const {
  BSON: { ObjectId },
} = Realm;
const collection = "ReservedTimes";
const adminsCollection = "config";
const adminsConfig = {
  _id: ObjectId("6319d2a63fa560fdc5a080be"),
};
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
async function updateAdmins(adminName) {
  const { admins } = await realmService.findOne(adminsCollection, adminsConfig);
  admins.push(adminName);
  return await realmService.updateOne(adminsCollection, adminsConfig, {
    admins: admins,
  });
}
const getReserveTime = async () => {
  if (!app.currentUser) return;
  let reserveDb = await find();
  return reserveDb
    .map((timeObj) => {
      const obj = { ...timeObj };
      obj.value = obj.time;
      obj.label = obj.time;
      return obj;
    })
    .sort((a, b) => a.value - b.value);
};
export default {
  insertNewTime,
  findOne,
  find,
  updateOne,
  updateMany,
  updateAdmins,
  getReserveTime,
};
