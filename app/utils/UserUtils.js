import storage from "../miscellaneous/AsyncStorage";

const getuser = (setUser) => {
  storage
    .load({
      key: "UserInfo",

      // autoSync (default: true) means if data is not found or has expired,
      // then invoke the corresponding sync method
      autoSync: true,

      syncInBackground: true,

      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((ret) => {
      setUser(ret);
    })
    .catch((err) => {
      console.warn(err.message);
    });
};

const getChats = (chatId, setChats) => {
  storage
    .load({
      key: "Chat" + chatId,

      // autoSync (default: true) means if data is not found or has expired,
      // then invoke the corresponding sync method
      autoSync: true,

      syncInBackground: true,

      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((ret) => {
      setChats(ret);
      console.log("ChatLength: " + ret.length);
    })
    .catch((err) => {
      console.warn(err.message);
    });
};

const addChats = (chatId, setChats, newChat) => {
  storage
    .load({
      key: "Chat" + chatId,

      // autoSync (default: true) means if data is not found or has expired,
      // then invoke the corresponding sync method
      autoSync: true,

      syncInBackground: true,

      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((ret) => {
      if (
        ret.some((item) => {
          return item._id !== newChat._id;
        })
      )
        setChats([...ret, newChat]);
      console.log("ChatLength: " + ret.length);
      saveChat(chatId, [...ret, newChat]);
    })
    .catch((err) => {
      console.warn(err.message);
    });
};

const saveChat = (chatId, data) => {
  storage.save({
    key: "Chat" + chatId, // Note: Do not use underscore("_") in key!
    data: data,
    expires: null,
  });
};

export { getuser, getChats, addChats, saveChat };
