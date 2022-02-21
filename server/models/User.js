module.exports = class User {
  static USERS = {};
  uid;
  iat;
  exp;
  sidToRoom = [];
  constructor(uid, iat, exp) {
    this.uid = uid;
    this.iat = iat;
    this.exp = exp;
  }
  getUser() {
    return this;
  }
  getSidToRoom() {
    return this.sidToRoom;
  }
  setSidToRoom(sid, room) {
    let prevRoom;
    let currSid = this.sidToRoom.find((s) => s[0] === sid);
    if (currSid == null) {
      currSid = [sid, room];
      this.sidToRoom.push(currSid);
    } else {
      prevRoom = currSid[1];
      currSid[1] = room;
    }
    return { currSid, prevRoom };
  }
  deleteSidToRoom(sid) {
    this.sidToRoom = this.sidToRoom.filter((s) => s[0] !== sid);
    return this.sidToRoom;
  }
  static getAllUsers() {
    return this.USERS;
  }
  static addUser(User) {
    if (this.findUser(User.uid)) return;
    this.USERS[User.uid] = User;
  }
  static findUser(uid) {
    return this.USERS[uid];
  }

  static findUserBySid(sid) {
    for (let user in this.USERS) {
      let sidToRoomArr = this.USERS[user].getSidToRoom();
      for (let arr of sidToRoomArr) {
        if (arr[0] === sid) return this.USERS[user];
      }
    }
    return null;
  }
  static deleteSocket(sid) {
    const user = this.findUserBySid(sid);
    if (!user) return;
    const sidToRoom = user.deleteSidToRoom(sid);
    if (user.getSidToRoom().length === 0) {
      this.deleteUser(user.uid);
    }
    return sidToRoom;
  }
  static deleteUser(uid) {
    delete this.USERS[uid];
  }
};
