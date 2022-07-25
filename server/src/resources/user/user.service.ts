import UserModel from "./user.model";
import token from "../../utils/token";

class UserService {
  private user = UserModel;

  public async register(
    username: string,
    email: string,
    password: string,
    role: string
  ): Promise<string | Error> {
    try {
      console.log(username, email, password, role);
      const user = await this.user.create({
        username,
        email,
        password,
        role,
      });
      const accessToken = token.createToken(user);

      return accessToken;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async login(
    username: string,
    password: string
  ): Promise<string | Error> {
    try {
      const errMessage = "Wrong username or password";
      const user = await this.user.findOne({ username });
      if (!user) {
        throw new Error(errMessage);
      }
      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      } else {
        throw new Error(errMessage);
      }
    } catch (e) {
      throw new Error("Unable to authenticate");
    }
  }
}

export default UserService;
