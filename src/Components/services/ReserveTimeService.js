import realmService from "./realmService";
import * as Realm from "realm-web";
import { app } from "../realmConfig";
const {
  BSON: { ObjectId },
} = Realm;
const collection = "ReservedTimes";
const userCustomDataCollection = "userCustomData";
const adminsCollection = "config";
const adminsTimes = "adminTimes";
const adminsConfig = {
  _id: ObjectId("631dda00104248fda6639430"),
};
async function insertNewTime(data, myCollection = collection) {
  const result = await realmService.insertOne(myCollection, data);
  return result.insertedId.toString();
}
async function findOne(queryObj, myCollection = collection) {
  const result = await realmService.findOne(myCollection, queryObj);
  if (result) {
    result._id = result._id.toString();
    return result;
  }
  return null;
}
async function find(collection, queryObj) {
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
  if (admins.find((admin) => admin === adminName)) {
    alert("this admin already exists!");
    return;
  }
  admins.push(adminName);
  return await realmService.updateOne(adminsCollection, adminsConfig, {
    admins: admins,
  });
}
async function getAdmins() {
  const { admins } = await realmService.findOne(adminsCollection, adminsConfig);

  return admins;
}
const getReserveTime = async (collection, adminQueryObj) => {
  if (!app.currentUser) return;
  let reserveDb = await find(collection, adminQueryObj);
  return reserveDb
    .map((timeObj) => {
      const obj = { ...timeObj };
      obj.value = obj.time;
      obj.label = obj.time;
      return obj;
    })
    .sort((a, b) => a.value - b.value);
};
async function addUserCustomData(data) {
  return await realmService.insertOne(userCustomDataCollection, {
    ...data,
    userId: app.currentUser.id,
  });
}
async function upsertUserCustomData(data) {
  return await realmService.updateOne(
    userCustomDataCollection,
    { userId: app.currentUser.id },
    {
      ...data,
      userId: app.currentUser.id,
    },
    true
  );
}
async function getUserCustomDataWithSearch() {
  return await findOne(
    {
      userId: app.currentUser.id,
    },
    userCustomDataCollection
  );
}
export default {
  insertNewTime,
  findOne,
  find,
  updateOne,
  updateMany,
  updateAdmins,
  getReserveTime,
  getAdmins,
  addUserCustomData,
  upsertUserCustomData,
  getUserCustomDataWithSearch,
};
