const USERS = [];

function addUser(user) {
  const { username, room, sid } = user;
  const userIdx = USERS.findIndex((u) => u.username === username);
  if (userIdx === -1) {
    USERS.push(user);
    console.log("added user: ", user);
  } else {
    if (sid === USERS[userIdx].sid) {
      console.log("user already in USERS arr? do nothing?");
    } else {
      console.log("dupe username or dupe taps?");
      USERS[userIdx].sid = sid;
    }
  }
}
function getUser(userSid) {
  return USERS.find((u) => u.sid === userSid);
}

function removeUser(userSid) {
  USERS.filter((u) => u.sid === userSid);
  console.log("removed user: ", userSid);
}

exports.addUser = addUser;
exports.removeUser = removeUser;
exports.getUser = getUser;
