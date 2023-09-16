import SyncStorage from "sync-storage";

const addData = async (key, value) => {
  const data = await SyncStorage.init();
  SyncStorage.set(key, value);
};

const getData = async (key) => {
  const data = await SyncStorage.init();
  return SyncStorage.get(key);
};

export { addData, getData };
