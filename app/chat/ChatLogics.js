export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const isUserSender = (loggedUser, message) => {
  return message.sender._id === loggedUser._id;
};
